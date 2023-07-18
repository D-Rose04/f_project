import React, { useEffect, useState } from 'react';
import { auth, db } from "../config/config-firebase";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';


export function LoginProvider ( { children } ) {
    const USER_COLLECTION = "users";
    const provider = new GoogleAuthProvider();
    const [currUser, setCurrUser] = useState();
    const [userInfo, setUserInfo] = useState();
    const [logged, setLogged] = useState( false );
    const userRef = collection( db, USER_COLLECTION )

    async function SignUp ( email, pwd ) {
        return await createUserWithEmailAndPassword( auth, email, pwd );
    }

    async function SignIn ( email, pwd ) {
        return signInWithEmailAndPassword( auth, email, pwd );
    }

    async function SignInWithGoogle () {
        const credential = await signInWithPopup( auth, provider );
        const fullName = await credential.user.displayName.split( ' ' );

        const userExist = await getUser( await credential.user.uid );
        if ( await !userExist ) {
            AddUser( await credential.user.uid,
                fullName[0],
                fullName[1] ?? "",
                await credential.user.phoneNumber ?? "",
                "",
                await credential.providerId ?? "",
                true );
        }

        getUser( await credential.user.uid );
        return credential;
    }

    async function AddUser ( uid, name, lastname, phone, picture, providerId, providerImage ) {
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
        await addDoc( userRef, data )
    }

    async function updateUserName ( userName ) {
        updateProfile( auth.currentUser, { displayName: userName } );
    }

    async function SignOut () {
        signOut( auth );
    }

    async function getUser ( uid ) {
        const q = query( userRef, where( "uid", "==", uid ) );
        const user = ( await getDocs( q ) ).docs.at( 0 )?.data();
        setUserInfo( await user );
        return user;
    }

    async function changePassword(){
        
    }


    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, ( user ) => {
            setCurrUser( user );
            if ( user )
                getUser( user.uid );
        } );
        return unsubscribe;
    }, [] );

    const LOGIN = {
        currUser,
        SignUp,
        SignIn,
        SignInWithGoogle,
        updateUserName,
        logged,
        setLogged,
        SignOut,
        userInfo,
        getUser
    };

    return (
        <loginContext.Provider value={LOGIN}>
            {children}
        </loginContext.Provider>
    )
}
export const loginContext = React.createContext();