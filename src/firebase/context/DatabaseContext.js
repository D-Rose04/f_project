import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/config-firebase";

const USERS_COLLECTION = 'users'

export async function addUser ( uid, name, lastname, phone, picture, providerId, providerImage ) {
    const data = {
        uid,
        name,
        lastname,
        phone,
        picture,
        active: false,
        location: null,
        country: null,
        favoritePets: [],
        notifications: [],
        providerId,
        providerImage
    }
    await addDoc( collection( db, USERS_COLLECTION ), data )
}