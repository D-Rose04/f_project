import React, { useEffect, useState } from 'react';
import { auth } from "../config/config-firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

export const loginContext = React.createContext();

export function LoginProvider ( { children } ) {
    const [currUser, setCurrUser] = useState();
    const provider = new GoogleAuthProvider();
    const [logged, setLogged] = useState( false );

    async function SignUp ( email, pwd ) {
        return await createUserWithEmailAndPassword( auth, email, pwd );
    }

    async function SignIn ( email, pwd ) {
        return signInWithEmailAndPassword( auth, email, pwd );
    }

    async function SignInWithGoogle () {
        return signInWithPopup( auth, provider );
    }

    async function updateUserName ( userName ) {
        updateProfile( auth.currentUser, { displayName: userName } );
    }

    async function SignOut () {
        signOut( auth );
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, ( user ) => { setCurrUser( user ); } );
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
    };

    return (
        <loginContext.Provider value={LOGIN}>
            {children}
        </loginContext.Provider>
    )
}