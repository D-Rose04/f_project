import { addDoc, and, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, or, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../config/config-firebase"
import { uploadPetPicture } from "../StorageContext"
import { checkChatByUsers, createChat, sendMessage, sendMessageWithImage } from "./ChatContext"
import emailjs from '@emailjs/browser'
import { UseLoginContext } from "../../hooks/UseLogin"

const PETS_COLLECTION = 'pets'
const LOST_PETS_COLLECTION = 'lostPets'
const USERS_COLLECTION = 'users'
const ADOPT_REQUESTS_COLLECTION = 'adoptRequests'
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
        adopted: false,
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

export async function getPets(uid) {
    const petsQuery = query(collection(db, PETS_COLLECTION), and(where("deleted", "==", false),
        where("uid", '!=', uid),
        where('adopted', '==', false)))
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

export async function editPet(petId, imageBucket, animal, name, race, sex, ageNum, timeUnit, size, description, province, municipality, additionalDetails) {

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
        province,
        municipality,
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

export async function setPetAsAdopted(petId) {
    const petRef = doc(db, PETS_COLLECTION, petId)
    await updateDoc(petRef, {
        adopted: true
    })
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

export async function sendRequestEmail(petId){
    try {
        const petSnap = await getDoc(doc(db, PETS_COLLECTION, petId))
        const petData = petSnap.data()

        const userSnap = await getDoc(doc(db, USERS_COLLECTION, petData.uid))
        const userData = userSnap.data()

        const templateParams = {
            toEmail: userData.email,
            petName: petData.name,
            petImage: petData.image,
            pageLink: 'https://happyfeets-5eec5.web.app/my-pets/' + petId,
        }
        console.log(templateParams)

        emailjs.send('happy-feets-email', 'template_zvd3drd', templateParams, 'pdeNSN8TvAzJD9YlQ')
    } catch (error) {
        console.log(error)
    }
    
}

export async function addAdoptRequest(uid, petId, fullName, phone, userAge, direction, prevExperience, liveWith, placeType, placeDesc) {
    const data = {
        uid,
        petId,
        fullName,
        phone,
        userAge,
        direction,
        prevExperience: prevExperience == 'true',
        liveWith,
        placeType,
        placeDesc,
        status: 'pending'
    }

    const reqsRef = collection(db, ADOPT_REQUESTS_COLLECTION)
    let response
    addDoc(reqsRef, data).then(async res => {
        response = res
        sendRequestEmail(petId)
    }).catch(err => {
        response = "error"
    })
    return response
}

export async function getAdoptRequests(petId) {
    const reqsRef = collection(db, ADOPT_REQUESTS_COLLECTION)
    const reqsQuery = query(reqsRef, where("petId", "==", petId))
    const reqsSnap = await getDocs(reqsQuery)

    let reqData = []
    reqsSnap.forEach(req => {
        const data = req.data()
        data.id = req.id
        reqData.push(data)
    })

    return reqData
}

export async function getAdoptRequest(reqId) {
    const reqRef = doc(db, ADOPT_REQUESTS_COLLECTION, reqId)
    const reqSnap = await getDoc(reqRef)

    return reqSnap.exists() ? reqSnap.data() : null
}

export async function getAdoptRequestByUserAndPet(uid, petId) {
    const reqRef = collection(db, ADOPT_REQUESTS_COLLECTION)
    const reqQuery = query(reqRef, and(where('uid', '==', uid), where('petId', '==', petId)))
    const reqSnap = await getDocs(reqQuery)

    let reqData = []
    reqSnap.forEach(req => {
        const data = req.data()
        data.id = req.id
        reqData.push(data)
    })

    return reqData.length > 0 ? reqData[0] : null
}

export async function changeRequestStatus(reqId, status) {
    const reqRef = doc(db, ADOPT_REQUESTS_COLLECTION, reqId)
    await updateDoc(reqRef, {
        status
    })
}

export async function addLostPet(uid, image, name, animal, race, sex, size, description, province, municipality, exactLocation) {
    const userRef = doc(db, USERS_COLLECTION, uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data()

    const data = {
        uid,
        image: PET_PLACEHOLDER_IMAGE,
        animal,
        name,
        race,
        sex,
        size,
        description,
        province,
        municipality,
        exactLocation,
        phone: userData.phone,
        found: false,
        deleted: false
    }

    let petResponse
    const petsRef = collection(db, LOST_PETS_COLLECTION)
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

    const petRef = doc(db, LOST_PETS_COLLECTION, petResponse.id)
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

export async function getLostPets(uid) {
    const petRef = query(collection(db, LOST_PETS_COLLECTION),
        and(where("deleted", "==", false),
            where("found", '==', false),
            where("uid", '!=', uid)))
    const petSnap = await getDocs(petRef)

    let petData = []
    petSnap.forEach(pet => {
        const data = pet.data()
        data.id = pet.id
        petData.push(data)
    })

    return petData
}

export async function getLostUserPets(uid) {
    const petsRef = query(collection(db, LOST_PETS_COLLECTION), where("uid", "==", uid))
    const petsSnap = await getDocs(petsRef)

    let lostPets = []
    petsSnap.forEach(pet => {
        const data = pet.data()
        data.id = pet.id
        lostPets.push(data)
    })

    return lostPets
}

export async function getLostPet(petId) {
    const petRef = doc(db, LOST_PETS_COLLECTION, petId)
    const petSnap = await getDoc(petRef)

    return petSnap.exists() ? petSnap.data() : null
}

export async function editLostPet(petId, imageBucket, animal, name, race, sex, size, description, province, municipality, exactLocation) {

    const data = {
        image: imageBucket,
        animal,
        name,
        race,
        sex,
        size,
        description,
        province,
        municipality,
        exactLocation
    }

    const petRef = doc(db, LOST_PETS_COLLECTION, petId)
    let response
    await updateDoc(petRef, data).then(() => {
        response = true
    }).catch(error => {
        response = false
    })

    return response
}

export async function changeLostPetStatus(uid, petId) {

    console.log(uid, petId)
    const petRef = doc(db, LOST_PETS_COLLECTION, petId)
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

export async function sendPetFound(uid, petId, image, whereFound, note) {
    const petRef = doc(db, LOST_PETS_COLLECTION, petId)
    const petSnap = await getDoc(petRef)

    if (!petSnap.exists()) {
        return null
    }
    const petData = petSnap.data()
    const ownerUID = petData.uid

    let chatId = await checkChatByUsers(uid, ownerUID)

    if (chatId == null) {
        chatId = await createChat(uid, ownerUID)
    }

    const msgText = `¿Donde lo encontre?
    ${whereFound}`

    await sendMessageWithImage(uid, msgText, image, chatId)

    if (note) {
        await sendMessage(uid, note, chatId)
    }

    return chatId
}

export async function markPetAsFound(petId) {
    const petRef = doc(db, LOST_PETS_COLLECTION, petId)
    await updateDoc(petRef, {
        found: true
    })
}