import React, { createContext, useState } from 'react';

export const loadingContext = createContext();

export function LoadingProvider ( { children } ) {
    const [loading, setLoading] = useState(true);

    const value ={
        loading,
        setLoading
    };

    return (
        <loadingContext.Provider value={value}>
            {children}
        </loadingContext.Provider>
    )
}
