import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UseLoginContext } from './firebase/hooks/UseLogin'
import MainLayout from "./layout/MainLayout";
import Adopt from "./pages/Adopt/Adopt";
import Social from "./pages/Social/Social";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
import { BounceLoader } from 'react-spinners';
import { UseLoadingContext } from './firebase/hooks/UseLoading'
import MyPets from './pages/MyPets/MyPets';
import LostPets from './pages/LostPets/LostPets';
import Chat from './pages/Chat/Chat';
import ChatDetails from './pages/Chat/ChatDetails/ChatDetails';
import AddPet from './pages/MyPets/AddPet/AddPet';
import EditPet from './pages/MyPets/EditPet/EditPet';
import Favorites from './pages/MyPets/Favorites/Favorites';
import Lost from './pages/MyPets/Lost/Lost'
import AddLost from './pages/MyPets/Lost/AddLost/AddLost';
import EditLost from './pages/MyPets/Lost/EditLost/EditLost';
import PetDetails from './pages/Adopt/PetDetails/PetDetails';
import AdoptPet from './pages/Adopt/AdoptPet/AdoptPet';
import LostPetDetails from './pages/LostPets/LostPetDetails/LostPetDetails';
import LostPetFound from './pages/LostPets/LostPetFound/LostPetFound';
import Router from './Router';

export default function App() {
  const { loading, setLoading } = UseLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ?
        <div className='loader'>
          <BounceLoader
            color={"var(--color-sblue-d)"}
            loading={loading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader" />
        </div>
        : <Router />
      }
    </>
  )
}
