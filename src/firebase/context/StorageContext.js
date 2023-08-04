import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/config-firebase";

const BUCKET_URL = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const PROFILE_FOLDER='profile_pics'
const POST_FOLDER='post_img'
// Uploads image and returns the storage bucket
// export async function uploadImage(image, uid) {
//     const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
//     const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
//     await uploadBytes(ref(storage, bucket), image);
//     return bucket;
// }

export async function uploadProfilePicture(image, uid){
    // const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const bucket = `${BUCKET_URL}/${PROFILE_FOLDER}/${uid}.jpg`;
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

// export async function uploadPostPicture(uid, image, postBody){
//     // const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
//     const bucket = `${BUCKET_URL}/${MESSAGES_MULTIMEDIA_FOLDER}/${postBody}/${uid}_${postImage}.jpg`;
//     const storageRef=ref(storage, bucket)
//     await uploadBytes(storageRef, image)
//     return bucket
// }

export async function uploadPostPicture(uid, image, postBody) {
    const fileName = `${uid}_${Date.now()}.jpg`; 
    const storageRef = ref(storage, `${BUCKET_URL}/${POST_FOLDER}/${postBody}/${fileName}`);
    await uploadBytes(storageRef, image);
  
    // Obten la URL de descarga de la imagen
    const downloadURL = await getDownloadURL(storageRef);
  
    return downloadURL;
  }