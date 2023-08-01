import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/config-firebase";

const BUCKET_URL = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const PROFILE_FOLDER='profile_pics'
const MESSAGES_MULTIMEDIA_FOLDER='messages_img'
const PETS_FOLDER='pets_img'
// Uploads image and returns the storage bucket
// export async function uploadImage(image, uid) {
//     const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
//     const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
//     await uploadBytes(ref(storage, bucket), image);
//     return bucket;
// }

export async function uploadProfilePicture(image, uid){
    const bucket = `${BUCKET_URL}/${PROFILE_FOLDER}/${uid}.jpg`;
    const storageRef=ref(storage, bucket)
    await uploadBytes(storageRef, image)
    return bucket
}

export async function uploadMessagePicture(image, chatId, uid, time){
    const bucket = `${BUCKET_URL}/${MESSAGES_MULTIMEDIA_FOLDER}/${chatId}/${uid}_${time}.jpg`;
    const storageRef=ref(storage, bucket)
    await uploadBytes(storageRef, image)
    return bucket
}

export async function uploadPetPicture(image, uid, petId){
    const bucket = `${BUCKET_URL}/${PETS_FOLDER}/${uid}/${petId}.jpg`;
    const storageRef=ref(storage, bucket)
    await uploadBytes(storageRef, image)
    return bucket
}

// Replaces existing image in storage and returns the storage bucket
export function replaceImage(image, bucket) {
    uploadBytes(ref(storage, bucket), image);
}

// Deletes existing image in storage
export function deleteImage(bucket) {
    deleteObject(ref(storage, bucket));
}

// Gets the download URL from the reference URL
export async function getURL(bucket) {
    return await getDownloadURL(ref(storage, bucket));
}