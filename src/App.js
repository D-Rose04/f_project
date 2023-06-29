import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WavyContainer } from 'react-wavy-transitions';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Main from './layout/Main';
import Nav from './layout/Nav';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import { UseLoginContext } from './firebase-setup/hooks/UseLogin';
import Pets from './pages/pets/Pets';

export default function App () {
  const { currUser } = UseLoginContext();
  return (
    <BrowserRouter>
      <WavyContainer />
      <Routes>
        <Route path="/" element={
          <>
            <Nav />
            <Main />
          </>
        }>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mascotas" element={<Pets />} />
          <Route path="*" element={<>No Match</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
