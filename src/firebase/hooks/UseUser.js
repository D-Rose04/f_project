import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export function useUserContext() {
    return useContext(UserContext);
}
