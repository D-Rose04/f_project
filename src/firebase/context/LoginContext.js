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

    function SignUp ( email, pwd ) {
        return createUserWithEmailAndPassword( auth, email, pwd );
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
        <loginContext.Provider value={value}>
            {children}
        </loginContext.Provider>
    )
}