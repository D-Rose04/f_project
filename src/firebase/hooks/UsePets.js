import { useContext } from 'react';
import { petsContext } from '../context/PetsContext';

export function UsePetsContext() {
    return useContext(petsContext);
}
