import React, { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';
import { signOut } from 'firebase/auth';

function Profile () {
  const [, setTitle] = useOutletContext()
  const { currUser, SignOut } = UseLoginContext();
  const { setLoading } = UseLoadingContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setLoading( true );
    SignOut()
      .then( () => setTimeout( () => {
        navigate('/');
        setLoading( false );
      }, 1500 ) );
  };

  useEffect( () => {
    setTitle( "Perfil" );
  }, [] )

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="profile-layout d-flex gap-5 bg-wisteria py-2 px-5 rounded-2">
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle user-image" style={{ width: '150px', height: '150px' }} src={currUser.photoURL} referrerPolicy='no-referrer' alt="" />
          <span className="fw-bold fs-4 my-4">{currUser.displayName}</span>
          <p className="fs-5">{currUser.email}</p>
          <p className="fs-5">{currUser.phoneNumber}</p>
        </div>
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
          <span className="fw-bold fs-4 my-4">Seguridad</span>
          <button className="w-100 shadow text-dark btn btn-thistle">Cambiar Contraseña</button>
          <button className="w-100 shadow text-dark btn btn-thistle mt-2">Editar Perfil</button>
          <button className="w-100 shadow text-dark btn btn-thistle mt-2" onClick={handleLogOut} >Cerrar Sesion</button>
        </div>
      </div>
    </div>
  )
}

export default Profile