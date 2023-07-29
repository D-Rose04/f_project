import React from 'react'
import { db, storage } from '../config/config-firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const UserContext = React.createContext();

export default function UserProvider ( { children } ) {
    const BUCKET_URL = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
    const PROFILE_FOLDER = 'profile_pics';
    const USER_COLLECTION = "users";

    async function uploadProfilePicture ( image, uid ) {
        const bucket = `${PROFILE_FOLDER}/${uid}.jpg`;
        const storageRef = ref( storage, bucket );
        return await uploadBytes( storageRef, image )
            .then( ( s ) => getDownloadURL(s.ref) );
    }

    async function UpdateUser ( uid, data, url, imageChanged ) {
        const userRef = doc( db, USER_COLLECTION, uid );
        if ( url !== "" && imageChanged) {
            const newimage = await uploadProfilePicture( url, uid )
            data.imgUrl = newimage;
            data.providerImage = false;
        }
        await updateDoc( userRef, await data );
    }

    const value = {
        UpdateUser,
        uploadProfilePicture
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
