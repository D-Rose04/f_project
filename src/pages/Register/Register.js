import React from 'react'
import './Register.css'

function Register() {
    return (
        <div class="position-absolute top-50 start-50 translate-middle row">
            <div class="col bg-gray rounded-start-3 p-5">
                <div class="d-flex justify-content-center align-items-center gap-3">
                    <h3 class="fw-bold">Happy Feets</h3>
                    <img class="img-fluid rounded-circle" src="https://images.placeholders.dev/?width=50&height=50" alt="" />
                </div>
                <input class="form-control login-input py-2 px-4 rounded mt-5" type="email" name="email" id="txtEmail" placeholder="Email" />
                <input class="form-control login-input py-2 px-4 rounded mt-3" type="text" name="user" id="txtUser" placeholder="Usuario" />
                <input class="form-control login-input py-2 px-4 rounded mt-3" type="password" name="password" id="txtPass" placeholder="Contraseña" />
                <button class="btn btn-thistle w-100 mt-5" type="button">Iniciar Sesion</button>
                <button class="btn btn-primary w-100 mt-2" type="button">Registrarse</button>
            </div>
            <div class="col bg-indigo p-5 rounded-end-3">
                <img class="img-fluid rounded-2" src="https://images.placeholders.dev/?width=300&height=300" alt="" />
                {/* <h3 class="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3> */}

                <button class="btn btn-primary w-100 mt-2" type="button">Subir Imagen</button>
                <input class="form-control login-input py-2 px-4 rounded mt-2" type="text" name="name" id="txtName" placeholder="Nombre" />
                <input class="form-control login-input py-2 px-4 rounded mt-2" type="text" name="lastname" id="txtApe" placeholder="Apellido" />
            </div>

        </div>
    )
}

export default Register