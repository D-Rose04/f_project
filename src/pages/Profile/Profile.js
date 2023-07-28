import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';

function Profile () {
  const [changePwd, setChangePwd] = useState( false );
  const [, setTitle] = useOutletContext();
  const { currUser, userInfo, SignOut, getUser } = UseLoginContext();
  const [user, setUser] = useState( { txtEmail: '', txtPass: '' } );
  const { setLoading } = UseLoadingContext();
  const navigate = useNavigate();

  const handleInput = ( event ) => {
    const { id, value } = event.target;
    setUser( { ...user, [id]: value } );
  };

  const handleLogOut = async () => {
    setLoading( true );
    SignOut()
      .then( () => setTimeout( () => {
        navigate( '/' );
        setLoading( false );
      }, 1500 ) );
  };

  useEffect( () => {
    setLoading( true );
    setTitle( "Perfil" );
    // getUser( currUser.uid )
    setLoading( false );
    

  }, [] )

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="profile-layout d-flex gap-5 bg-wisteria py-2 px-5 rounded-2">
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle user-image"
            style={{ width: '150px', height: '150px' }}
            src={userInfo.providerImage ? currUser.photoURL : userInfo.picture}
            referrerPolicy='no-referrer' alt="User Profile" />
          <span className="fw-bold fs-4 my-4">{userInfo.name ?? ""} {userInfo.lastname ?? ""}</span>
          <p className="fs-5">{currUser.email}</p>
          <p className="fs-5">{userInfo.phone ?? ""}</p>
        </div>
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
          <span className="fw-bold fs-4 my-4">Seguridad</span>
          <button className="w-100 shadow text-dark btn btn-thistle" onClick={() => setChangePwd( !changePwd )}>Cambiar Contraseña</button>
          {changePwd ?
            <>
              <input className="form-control login-input py-2 px-4 rounded mt-2" type="password" name="pwd" id="pwd" placeholder="Contraseña" onChange={handleInput} />
              <input className="form-control login-input py-2 px-4 rounded mt-2" type="password" name="confirmPwd" id="confirmPwd" placeholder="Confirmar Contraseña" onChange={handleInput} />
            </> : <></>
          }
          <button className="w-100 shadow text-dark btn btn-thistle mt-2">Editar Perfil</button>
          <button className="w-100 shadow text-dark btn btn-thistle mt-2" onClick={handleLogOut} >Cerrar Sesion</button>
        </div>
      </div>
    </div>
  )
}

export default Profile