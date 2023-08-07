import './Register.css'
import styles from './Register.styles'
import React, { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import ImagePicker from '../../components/layout/ImagePicker/ImagePicker'
import { useNavigate } from 'react-router-dom'
// import { uploadProfilePicture } from '../../firebase/context/StorageContext'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'

import { FaGoogle } from 'react-icons/fa'
import { UseLoadingContext } from '../../firebase/hooks/UseLoading'
import { addUser, checkEmail } from '../../firebase/context/Database/UserContext'
import { createUserChat } from '../../firebase/context/Database/ChatContext'
import { Toast, ToastContainer } from 'react-bootstrap'
import { DEFAULT_PROVIDER } from '../../utils/constants'
import { useUserContext } from '../../firebase/hooks/UseUser'


function Register () {
    const [name, setName] = useState( "" )
    const [lastName, setLastName] = useState( "" )
    const [phone, setPhone] = useState( "" )
    const [email, setEmail] = useState( "" )
    const [password, setPassword] = useState( "" )
    const [repPassword, setRepPassword] = useState( "" )
    const [image, setImage] = useState( "" )
    const [emailInUse, setEmailInUse] = useState( false )
    const [completeFields, setCompleteFields] = useState( false )
    const [differentPasswords, setDifferentPasswords] = useState( false )
    const [toastData, setToastData] = useState( [] )
    const [showToast, setShowToast] = useState( false )
    const { setLoading } = UseLoadingContext();
    const { uploadProfilePicture } = useUserContext();
    const authContext = UseLoginContext();
    const navigate = useNavigate()


    const formSubmit = e => {
        e.preventDefault()
        handleSubmit()
    }

    const handleSubmit = async () => {

        if ( !name || !lastName || !phone || !email || !password || !repPassword ) {
            setToastData( ['Campos vacios', 'Debes rellenar todos los campos', 'danger'] )
            setShowToast( true )
            return
        }

        if ( !image ) {
            setToastData( ['Sin imagen', 'Debes seleccionar una imagen de perfil', 'danger'] )
            setShowToast( true )
            return
        }

        if ( password !== repPassword ) {
            setToastData( ['Contraseñas invalidas', 'Las contraseñas no coinciden', 'danger'] )
            setShowToast( true )
            return
        }

        try {
            if ( await checkEmail( email ) ) {
                setLoading( false )
                setToastData( ['Email invalido', 'Este email ya esta en uso', 'warning'] )
                setShowToast( true )
                return
            }

            setLoading( true )

            const userData = await authContext.SignUp( email, password )
            const uid = userData.user.uid
            const bucket = await uploadProfilePicture( image, uid )
            await addUser( uid, email, name, lastName, phone, await bucket, DEFAULT_PROVIDER, false )
            await createUserChat( uid )
            await authContext.SignOut()
            navigate( '/login' )
            navigate( '/login' )
        } catch ( error ) {
            console.error( error )
        }
        finally {
            setLoading( false );
        }
        setLoading( false )
    }

    const googleRegister = async () => {
        authContext.SignInWithGoogle()
            .finally( () => navigate( '/' ) );
    }

    return (
        <div className='h-100 bg-white'>
            <ToastContainer
                className="p-3"
                position={'top-end'}
                style={{ zIndex: 1 }}
            >
                <Toast show={showToast} bg={toastData[2]} onClose={() => setShowToast( false )} delay={5000} autohide>
                    <Toast.Body>
                        <h5 className='text-white'>{toastData[0]}</h5>
                        <p className='text-white'>{toastData[1]}</p>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="position-absolute top-50 start-50 translate-middle row">
                <div className="col bg-gray rounded-start-3 p-5">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <h3 className="fw-bold">Happy Feets</h3>
                        <img className="img-fluid rounded-circle" width={50} src={require( "../../img/logo.png" )} alt="" />
                    </div>
                    <form onSubmit={formSubmit}>
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
                                    onChangeCapture={( e ) => {setPhone( e.target.value ); console.log(e.target.value)}}
                                    maxLength={15}
                                />
                            )}
                        </ReactInputMask>
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
                        {emailInUse && <h6 className='text-danger mt-2'>Este email ya esta en uso</h6>}

                        <input
                            className="form-control py-2 px-4 rounded mt-3"
                            style={styles.loginInput}
                            type="password"
                            name="password"
                            id="txtPass"
                            placeholder="Contraseña"
                            required
                            value={password}
                            onChange={( e ) => setPassword( e.target.value )}
                        />

                        <input
                            className="form-control py-2 px-4 rounded mt-3"
                            style={styles.loginInput}
                            type="password"
                            name="rePassword"
                            id="txtRePass"
                            placeholder="Repetir Contraseña"
                            required
                            value={repPassword}
                            onChange={( e ) => setRepPassword( e.target.value )}
                        />
                        <input className='d-none' type='submit' />
                    </form>
                </div>
                <div className="col bg-indigo p-5 rounded-end-3">
                    <ImagePicker controlId="inputImg" width="300" name="image" title="Selecciona una imagen" onImageSet={( image ) => setImage( image )} />

                    <button className="btn btn-primary w-100 mt-4" type="submit" onClick={handleSubmit}>Registrarse</button>
                    <button className="btn btn-primary w-100 mt-2" type="button" onClick={googleRegister}>
                        <div className="d-flex justify-content-center align-items-center" >
                            <FaGoogle />
                            <p style={{ margin: 'auto 0 auto 10px' }}>Registrarse con Google</p>
                        </div>
                    </button>
                    <button className="btn btn-thistle w-100 mt-2" type="button" onClick={() => navigate( '/login' )}>Iniciar Sesion</button>
                </div>
            </div>

        </div>
    )
}


export default Register 