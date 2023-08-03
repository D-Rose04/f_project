import React, { createContext, useState } from 'react';

export const loadingContext = createContext();

export function LoadingProvider ( { children } ) {
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        setLoading( true );
        setTimeout( () => {
            setLoading( false );
        }, 2500 );
    };

    const value ={
        loading,
        setLoading,
        handleClick
    };

    return (
        <loadingContext.Provider value={value}>
            {children}
        </loadingContext.Provider>
    )
}
