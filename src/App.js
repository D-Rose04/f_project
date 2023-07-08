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
import { UseLoadingContext } from './firebase/hooks/UseLoading';

export default function App () {
  const { currUser } = UseLoginContext();
  const { loading, setLoading } = UseLoadingContext();
  
  useEffect( () => {
    setTimeout( () => {
      setLoading( false );
    }, 1500 );
  }, [] );

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
        : <BrowserRouter>
          <Routes>
            {
              currUser && currUser.uid ?
                <Route path="/" element={<MainLayout />} children={[
                  <Route path="/" element={<Adopt />} />,
                  <Route path="/social" element={<Social />} />,
                  <Route path="/profile" element={<Profile />} />,
                ]} />
                : <Route path='/' element={<Landing />} />
            }
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<>No Match</>} />
          </Routes>
        </BrowserRouter>
      }
    </>
  )
}
