import { addDoc, and, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../config/config-firebase"
import { uploadPetPicture } from "../StorageContext"

const PETS_COLLECTION = 'pets'
const USERS_COLLECTION = 'users'
const PET_PLACEHOLDER_IMAGE = 'gs://happyfeets-5eec5.appspot.com/pets_img/placeholder.png'

export async function addPet(uid, image, animal, name, race, sex, ageNum, timeUnit, size, description, province, municipality, additionalDetails) {
    const data = {
        uid,
        image: PET_PLACEHOLDER_IMAGE,
        animal,
        name,
        race,
        sex,
        age: ageNum,
        timeUnit,
        size,
        description,
        province,
        municipality,
        additionalDetails,
        deleted: false
    }

    let petResponse
    const petsRef = collection(db, PETS_COLLECTION)
    await addDoc(petsRef, data)
        .then(res => {
            petResponse = res
        })
        .catch(error => {
            return { message: "add-pet-error", error }
        })

    let imgBucket
    await uploadPetPicture(image, uid, petResponse.id)
        .then(res => {
            console.log(res)
            imgBucket = res
        })
        .catch(error => {
            return { message: "upload-img-error", error }
        })

    const petRef = doc(db, PETS_COLLECTION, petResponse.id)
    await updateDoc(petRef, {
        image: imgBucket
    })
        .then(res => {
            return petResponse
        })
        .catch(error => {
            return { message: "set-img-error", error }
        })
}

export async function getPets() {
    const petsQuery = query(collection(db, PETS_COLLECTION), where("deleted", "==", false))
    const petsSnap = await getDocs(petsQuery)
    let petsData = []

    petsSnap.forEach(pet => {
        let data = pet.data()
        data.id = pet.id
        petsData.push(data)
    });

    return petsData
}

export async function loadUserPets(uid) {
    const petQuery = query(collection(db, PETS_COLLECTION), where('uid', '==', uid))
    const petsSnap = await getDocs(petQuery)

    let petsData = []
    petsSnap.forEach(petSnap => {
        let data = petSnap.data()
        data.id = petSnap.id
        petsData.push(data)
    });

    return petsData
}

export async function getPet(petId) {
    const petRef = doc(db, PETS_COLLECTION, petId)
    const petSnap = await getDoc(petRef)

    return petSnap.exists() ? petSnap.data() : null
}

export async function editPet(petId, imageBucket, animal, name, race, sex, ageNum, timeUnit, size, description, additionalDetails) {

    const data = {
        image: imageBucket,
        animal,
        name,
        race,
        sex,
        age: ageNum,
        timeUnit,
        size,
        description,
        additionalDetails
    }

    const petRef = doc(db, PETS_COLLECTION, petId)
    let response
    await updateDoc(petRef, data).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
        response = false
    })

    return response
}

export async function changePetStatus(uid, petId) {
    const petRef = doc(db, PETS_COLLECTION, petId)
    const petSnap = await getDoc(petRef)

    if (!petSnap.exists()) {
        return
    }

    const petData = petSnap.data()

    if (petData.uid != uid) {
        return
    }

    await updateDoc(petRef, {
        deleted: !petData.deleted
    })

    return true
}

export async function addFav(uid, petId) {
    const userRef = doc(db, USERS_COLLECTION, uid)
    await updateDoc(userRef, {
        favoritePets: arrayUnion(petId)
    })
}

export async function removeFav(uid, petId) {
    const userRef = doc(db, USERS_COLLECTION, uid)
    await updateDoc(userRef, {
        favoritePets: arrayRemove(petId)
    })
}

export async function getFavoritePetsIds(uid) {
    const userRef = doc(db, USERS_COLLECTION, uid)
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) return null

    const userData = userSnap.data()
    return userData.favoritePets
}

export async function getFavoritePets(uid) {
    const userRef = doc(db, USERS_COLLECTION, uid)
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) return null

    const favIds = userSnap.data().favoritePets

    let favPets = []

    for (const fav of favIds) {
        const petRef = doc(db, PETS_COLLECTION, fav)
        const petSnap = await getDoc(petRef)
        const data = petSnap.data()
        data.id = petSnap.id
        favPets.push(data)
    }

    return favPets
}