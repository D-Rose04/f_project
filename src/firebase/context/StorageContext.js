import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/config-firebase";

const BUCKET_URL = process.env.REACT_APP_FIREBASE_BUCKET_URL
const PROFILE_FOLDER='profile_pics'
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