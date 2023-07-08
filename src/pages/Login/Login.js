import React from 'react'
import './Login.css'
import { auth } from '../../firebase/config/config-firebase'
import { FirebaseAuth } from 'react-firebaseui'

const REDIRECT_PAGE = '/'

function Login() {

  return (
    <div className='position-relative w-100 h-100 bg-white'>
      <div className="position-absolute top-50 start-50 translate-middle row">
        <div className="col bg-indigo p-5 rounded-start-3">
          <img className="img-fluid rounded-circle" src="https://images.placeholders.dev/?width=360&height=360" alt="" />
          <h3 className="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3>
        </div>
        <div className="col bg-gray rounded-end-3 p-5">
          <h3 className="text-center">Inicia Sesion</h3>
          <input className="form-control login-input py-2 px-4 rounded mt-5" type="email" name="email" id="txtEmail" placeholder="Email" />
          <input className="form-control login-input py-2 px-4 rounded mt-3" type="password" name="password" id="txtPass" placeholder="Contraseña" />
          <button className="btn btn-thistle w-100 mt-5" type="button">Iniciar Sesion</button>
          <button className="btn btn-primary w-100 mt-2" type="button">Registrarse</button>
          
        </div>
      </div>
    </div>

  )
}

export default Login