import React from 'react'
import styles from './Register.styles'
import './Register.css'

function Register() {
    return (
        <div className='h-100 bg-white'>
            <div className="position-absolute top-50 start-50 translate-middle row">
                <div className="col bg-gray rounded-start-3 p-5">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <h3 className="fw-bold">Happy Feets</h3>
                        <img className="img-fluid rounded-circle" src="https://images.placeholders.dev/?width=50&height=50" alt="" />
                    </div>
                    <input className="form-control py-2 px-4 rounded mt-5" style={styles.loginInput} type="email" name="email" id="txtEmail" placeholder="Email" />
                    <input className="form-control py-2 px-4 rounded mt-3" style={styles.loginInput} type="text" name="user" id="txtUser" placeholder="Usuario" />
                    <input className="form-control py-2 px-4 rounded mt-3" style={styles.loginInput} type="password" name="password" id="txtPass" placeholder="Contraseña" />
                    <button className="btn btn-thistle w-100 mt-5" type="button">Iniciar Sesion</button>
                    <button className="btn btn-primary w-100 mt-2" type="button">Registrarse</button>
                </div>
                <div className="col bg-indigo p-5 rounded-end-3">
                    <img className="img-fluid rounded-2" src="https://images.placeholders.dev/?width=300&height=300" alt="" />
                    {/* <h3 className="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3> */}

                    <button className="btn btn-primary w-100 mt-2" type="button">Subir Imagen</button>
                    <input className="form-control py-2 px-4 rounded mt-2" style={styles.loginInput} type="text" name="name" id="txtName" placeholder="Nombre" />
                    <input className="form-control py-2 px-4 rounded mt-2" style={styles.loginInput} type="text" name="lastname" id="txtApe" placeholder="Apellido" />
                </div>

            </div>
        </div>

    )
}

export default Register