import React from 'react'
import styles from './Register.styles'
import './Register.css'
import ReactInputMask from 'react-input-mask'
import { useState } from 'react'
import { useEffect } from 'react'
import ImagePicker from '../../components/layout/ImagePicker/ImagePicker'
import { useNavigate } from 'react-router-dom'
import { uploadProfilePicture } from '../../firebase/context/StorageContext'
import { addUser } from '../../firebase/context/DatabaseContext'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'

function Register () {
    const [name, setName] = useState( "" )
    const [lastName, setLastName] = useState( "" )
    const [phone, setPhone] = useState( "" )
    const [email, setEmail] = useState( "" )
    const [password, setPassword] = useState( "" )
    const [image, setImage] = useState( "" )
    const [completeFields, setCompleteFields] = useState( false )
    const [isLoading, setLoading] = useState( false );

    const authContext = UseLoginContext();
    const navigate = useNavigate()

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );

        if ( !name || !lastName || !phone || !email || !password || !image ) {
            setCompleteFields( true );
            return
        }

        try {
            const userData = await authContext.SignUp( email, password );
            const uid = userData.user.uid;
            console.log( uid );
            const bucket = await uploadProfilePicture( image, uid );
            await handleUserInfo( uid, name, lastName, phone, bucket, userData.user.providerId, false );
            await authContext.SignOut();
        } catch ( error ) {
            console.error( error )
        }

        setLoading( false );
        navigate( '/' );
    }

    const handleUserInfo = async ( uid, name, lastName, phone, picture, providerId, providerImage ) => {
        await addUser( uid, name, lastName, phone, picture, providerId, providerImage )
    }

    const googleRegister = async () => {
        authContext.SignInWithGoogle()
            .finally( () => navigate( '/' ) );
    }

    return (
        <div className='h-100 bg-white'>
            <form action='#' onSubmit={handleSubmit}>

                <div className="position-absolute top-50 start-50 translate-middle row">

                    <div className="col bg-gray rounded-start-3 p-5">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <h3 className="fw-bold">Happy Feets</h3>
                            <img className="img-fluid rounded-circle" width={50} src={require( "../../img/logo.png" )} alt="" />
                        </div>
                        <input
                            className="form-control py-2 px-4 rounded mt-3"
                            style={styles.loginInput}
                            type="text"
                            name="name"
                            id="txtName"
                            placeholder="Nombre"
                            required
                            value={name}
                            onChange={( e ) => setName( e.target.value )}
                        />

                        <input
                            className="form-control py-2 px-4 rounded mt-3"
                            style={styles.loginInput}
                            type="text"
                            name="lastname"
                            id="txtApe"
                            placeholder="Apellido"
                            required
                            value={lastName}
                            onChange={( e ) => setLastName( e.target.value )}
                        />

                        <ReactInputMask mask="(999) 999-9999">
                            {( inputProps ) => (
                                <input
                                    {...inputProps}
                                    className="form-control py-2 px-4 rounded mt-3"
                                    style={styles.loginInput}
                                    type="text"
                                    name="phone"
                                    id="txtPhone"
                                    placeholder="Telefono"
                                    required
                                    onInput={( e ) => setPhone( e.target.value )}
                                />
                            )}
                        </ReactInputMask>
                        {/* <input className="form-control py-2 px-4 rounded mt-3" style={styles.loginInput} type="text" name="user" id="txtUser" placeholder="Usuario" /> */}

                        <button className="btn btn-primary w-100 mt-4" type="submit" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrarse'}</button>
                        <button className="btn btn-primary w-100 mt-2" type="button" onClick={googleRegister}>Registrarse con Google</button>
                        <button className="btn btn-thistle w-100 mt-2" type="button" onClick={() => navigate( '/login' )}>Iniciar Sesion</button>
                        {completeFields && <h6 className='text-danger mt-2'>Rellena todos los campos</h6>}
                    </div>
                    <div className="col bg-indigo p-5 rounded-end-3">
                        <ImagePicker controlId="inputImg" width="300" name="image" title="Selecciona una imagen" onImageSet={( image ) => setImage( image )} />
                        {/* <h3 className="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3> */}

                        <input
                            className="form-control py-2 px-4 rounded mt-3"
                            style={styles.loginInput}
                            type="email"
                            name="email"
                            id="txtEmail"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={( e ) => setEmail( e.target.value )}
                        />

                        <input
                            className="form-control py-2 px-4 rounded mt-2"
                            style={styles.loginInput}
                            type="password"
                            name="password"
                            id="txtPass"
                            placeholder="Contraseña"
                            required
                            value={password}
                            onChange={( e ) => setPassword( e.target.value )}
                        />
                    </div>
                </div>
            </form>

        </div>

    )
}

export default Register 