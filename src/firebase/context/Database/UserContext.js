import { collection, doc, getDoc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { db } from "../../config/config-firebase";

const USERS_COLLECTION = 'users'

export async function checkEmail(email) {
    const emailQuery = query(collection(db, USERS_COLLECTION), where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);
    return emailSnapshot.docs.length > 0
    //Sin terminar
}

export async function getUserByUID(uid) {
    const userRef = doc(db, USERS_COLLECTION, uid)
    const userSnap = await getDoc(userRef)
    return userSnap.exists() ? userSnap.data() : null
}

export async function addUser(uid, email, name, lastName, phone, imgUrl, providerId, providerImage) {
    const data = {
        uid,
        email,
        name,
        lastName,
        phone,
        imgUrl,
        active: false,
        location: null,
        country: null,
        favoritePets: [],
        notifications: [],
        providerId,
        providerImage
    }

    const userRef = doc(db, USERS_COLLECTION, uid)
    return await setDoc(userRef, data)
}