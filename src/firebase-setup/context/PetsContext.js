import React from 'react';
import { db } from '../config/config-firebase';

export const petsContext = React.createContext();

export function PetsProvider ( { children } ) {

    const value = {
        
    }

    return (
        <petsContext.Provider value={value}>
            {children}
        </petsContext.Provider>
    )
}
