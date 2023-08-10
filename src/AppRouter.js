import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UseLoginContext } from './firebase/hooks/UseLogin'
import MainLayout from "./layout/MainLayout";
import Adopt from "./pages/Adopt/Adopt";
import Social from "./pages/Social/Social";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
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
import RequestDetails from './pages/MyPets/RequestDetails/RequestDetails';
import AddPost from "./pages/Social/CRUD/AddPost/AddPost";
import Help from "./pages/Help/Help";
import NotFound from './pages/NotFound/NotFound';

function Router() {
  const { currUser } = UseLoginContext();

  return (
    <BrowserRouter>
      <Routes>
        {
          currUser && currUser.uid ?
            <Route path="/" element={<MainLayout />} children={[
              <Route path="/" element={<Adopt />} />,
              <Route path="/:petId" element={<PetDetails />} children={[
                <Route path='adopt' element={<AdoptPet />} />,
              ]} />,
              // <Route path="/adopt-pet/:petId" element={<PetDetails />} />,
              <Route path="/my-pets" element={<MyPets />} children={[
                <Route path='add-pet' element={<AddPet />} />,
                <Route path='edit-pet/:petId' element={<EditPet />} />,
              ]} />,
              <Route path='/my-pets/:petId' element={<PetDetails />} children={[
                <Route path='request/:requestId' element={<RequestDetails />} />,
              ]} />,
              <Route path='/my-pets/favorites' element={<Favorites />} />,
              <Route path='/my-pets/lost-pets' element={<Lost />} children={[
                <Route path='add-pet' element={<AddLost />} />,
                <Route path='edit/:petId' element={<EditLost />} />,
              ]} />,
              <Route path='/my-pets/lost-pets/:petId' element={<LostPetDetails />} />,
              <Route path="/lost-pets" element={<LostPets />} />,
              <Route path="/lost-pets/:petId" element={<LostPetDetails />} children={[
                <Route path='found' element={<LostPetFound />} />,
              ]} />,
              <Route path="/chat" element={<Chat />} />,
              <Route path="/chat/:chatId" element={<ChatDetails />} />,
              <Route path="/social" element={<Social />} children={[
                <Route path='add-post' element={<AddPost />} />,
              ]} />,
              <Route path="/profile/:profileUID" element={<Profile />} />,
              <Route path="/help" element={<Help />} />,
              <Route path="*" element={<NotFound />} />
            ]} />
            : <>
              <Route path='/' element={<Landing />} />,
              <Route path="/login" element={<Login />} />,
              <Route path="/register" element={<Register />} />,
              <Route path="/:petId" element={<Login />} children={[
                <Route path='adopt' element={<Login />} />,
              ]} />,
              // <Route path="/adopt-pet/:petId" element={<Login />} />,
              <Route path="/my-pets" element={<Login />} children={[
                <Route path='add-pet' element={<Login />} />,
                <Route path='edit-pet/:petId' element={<Login />} />,
              ]} />,
              <Route path='/my-pets/:petId' element={<Login />} children={[
                <Route path='request/:requestId' element={<Login />} />,
              ]} />,
              <Route path='/my-pets/favorites' element={<Login />} />,
              <Route path='/my-pets/lost-pets' element={<Login />} children={[
                <Route path='add-pet' element={<Login />} />,
                <Route path='edit/:petId' element={<Login />} />,
              ]} />,
              <Route path='/my-pets/lost-pets/:petId' element={<Login />} />,
              <Route path="/lost-pets" element={<Login />} />,
              <Route path="/lost-pets/:petId" element={<Login />} children={[
                <Route path='found' element={<Login />} />,
              ]} />,
              <Route path="/chat" element={<Login />} />,
              <Route path="/chat/:chatId" element={<Login />} />,
              <Route path="/social" element={<Login />} children={[
                <Route path='add-post' element={<Login />} />,
              ]} />,
              <Route path="/profile/:profileUID" element={<Login />} />,
              <Route path="/help" element={<Login />} />,
              <Route path="*" element={<NotFound />} />,
            </>
        }
      </Routes>
    </BrowserRouter>
  )
}

export default Router
