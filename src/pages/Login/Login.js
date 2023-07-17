import React, { useState } from 'react'
import './Login.css'
import { UseLoginContext } from '../../firebase/hooks/UseLogin';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';

function Login () {
  const { SignIn, SignInWithGoogle } = UseLoginContext();
  const { setLoading } = UseLoadingContext();
  const [user, setUser] = useState( { txtEmail: '', txtPass: '' } );
  const navigate = useNavigate();

  const handleInput = ( event ) => {
    const { id, value } = event.target;
    setUser( { ...user, [id]: value } );
  };

  const handleSignIn = async () => {
    await SignIn( user.txtEmail, user.txtPass );
    navigate( "/" );
  }

  const handleSignInWithGoogle = async () => {
    setLoading( true );
    SignInWithGoogle()
      .then( (response) => {
        //averiguar si el usuario es nuevo o no y a partir de ahi mandarlo a terminar el registro o al inicio
        setTimeout( () => {
          setLoading( false );
        }, 1500 );
      } )
      .finally( () => {
        setLoading(false)
        navigate( "/" ) 
      });
  }
  return (
    <div className="position-absolute top-50 start-50 translate-middle row">
      <div className="col bg-indigo p-5 rounded-start-3">
        <img className="img-fluid rounded-circle" src="https://images.placeholders.dev/?width=360&height=360" alt="" />
        <h3 className="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3>
      </div>
      <div className="col bg-gray rounded-end-3 p-5">
        <h3 className="text-center">Inicia Sesion</h3>
        <input className="form-control login-input py-2 px-4 rounded mt-5" type="email" name="email" id="txtEmail" placeholder="Email" onChange={handleInput} />
        <input className="form-control login-input py-2 px-4 rounded mt-3" type="password" name="password" id="txtPass" placeholder="Contraseña" onChange={handleInput} />
        <button className="btn btn-thistle w-100 mt-5" type="button" onClick={handleSignIn}>Iniciar Sesion</button>
        <button className="btn btn-primary w-100 mt-2" type="button" onClick={handleSignInWithGoogle}>
          <div className="d-flex justify-content-center align-items-center" >
            <FaGoogle />
            <p style={{ margin: 'auto 0 auto 10px' }}>Inicia Sesión Con Google</p>
          </div>
        </button>
      </div>
    </div>

  )
}

export default Login