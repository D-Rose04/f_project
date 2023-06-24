import React from 'react'
import './Login.css'

function Login() {
  return (
    <div class="position-absolute top-50 start-50 translate-middle row">
        <div class="col bg-indigo p-5 rounded-start-3">
            <img class="img-fluid rounded-circle" src="https://images.placeholders.dev/?width=360&height=360" alt="" />
            <h3 class="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3>
        </div>
        <div class="col bg-gray rounded-end-3 p-5">
            <h3 class="text-center">Inicia Sesion</h3>
            <input class="form-control login-input py-2 px-4 rounded mt-5" type="email" name="email" id="txtEmail" placeholder="Email" />
            <input class="form-control login-input py-2 px-4 rounded mt-3" type="password" name="password" id="txtPass" placeholder="Contraseña" />
            <button class="btn btn-thistle w-100 mt-5" type="button">Iniciar Sesion</button>
            <button class="btn btn-primary w-100 mt-2" type="button">Registrarse</button>
        </div>
    </div>
  )
}

export default Login