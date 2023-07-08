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

export const context = React.createContext();

export function LoginProvider ( { children } ) {
    const [currUser, setCurrUser] = useState();
    const provider = new GoogleAuthProvider();
    const [logged, setLogged] = useState( false );

    async function SignUp ( email, pwd ) {
        return await createUserWithEmailAndPassword( auth, email, pwd );
    }

    function SignIn ( email, pwd ) {
        return signInWithEmailAndPassword( auth, email, pwd );
    }

    function SignInWithGoogle () {
        return signInWithPopup( auth, provider );
    }

    function updateUserName ( userName ) {
        updateProfile( auth.currentUser, { displayName: userName } );
    }

    function SignOut () {
        signOut( auth );
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, ( user ) => { setCurrUser( user ); } );
        return unsubscribe;
    }, [] );

    const value = {
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
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}