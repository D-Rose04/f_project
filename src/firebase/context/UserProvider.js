import React from 'react'
import { db, storage } from '../config/config-firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';

export const UserContext = React.createContext();

export default function UserProvider ( { children } ) {
    const BUCKET_URL = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
    const PROFILE_FOLDER = 'profile_pics';
    const USER_COLLECTION = "users";

    async function uploadProfilePicture ( image, uid ) {
        const bucket = `${BUCKET_URL}/${PROFILE_FOLDER}/${uid}.jpg`;
        const storageRef = ref( storage, bucket )
        await uploadBytes( storageRef, image )
        return bucket
    }

    async function deleteImage ( uid ) {
        deleteObject( ref( storage, `${PROFILE_FOLDER}/${uid}.jpg` ) );
    }

    async function UpdateUser ( uid, data ) {
        const userRef = doc( db, USER_COLLECTION, uid );
        // if ( data.URL !== "" ) {
        //     deleteImage( data.uid )
        //         .then( async () => {
        //             data.URL = await uploadProfilePicture( data.Image, data.URL )
        //             data.providerImage = false;
        //         } );
        // }
        await updateDoc( userRef, await data );
    }

    const value = {
        UpdateUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
