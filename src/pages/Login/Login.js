import React, { useRef, useState } from 'react'
import './Login.css'
import { UseLoginContext } from '../../firebase/hooks/UseLogin';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';
import { Toast, ToastContainer } from 'react-bootstrap';

function Login() {
  const [user, setUser] = useState({ txtEmail: '', txtPass: '' });
  const [showToast, setShowToast] = useState(false)
  const [toastData, setToastData] = useState([])

  const { SignIn, SignInWithGoogle } = UseLoginContext();
  const { setLoading } = UseLoadingContext();

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignIn()
  }

  const handleSignIn = async () => {
    SignIn(user.txtEmail, user.txtPass)
      .then(response => {
        navigate("/")
      })
      .catch(error => {
        console.log(error)
        switch (error.code) {
          case "auth/wrong-password":
            setToastData(['Datos erroneos', 'Email y/o contraseña incorrecta', 'danger'])
            setShowToast(true)
            break;

          default:
            setToastData(['Error', 'Se ha producido un error inesperado, intentelo de nuevo mas tarde', 'danger'])
            setShowToast(true)
            break;
        }
      });
  }

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    SignInWithGoogle()
      .then((response) => {
        //averiguar si el usuario es nuevo o no y a partir de ahi mandarlo a terminar el registro o al inicio
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .finally(() => {
        setLoading(false)
        navigate("/")
      });
  }
  return (
    <>
    <ToastContainer
        className="p-3"
        position={'top-end'}
        style={{ zIndex: 1 }}
      >
        <Toast show={showToast} bg={toastData[2]} onClose={() => setShowToast(false)} delay={5000} autohide>
          <Toast.Body>
            <h5 className='text-white'>{toastData[0]}</h5>
            <p className='text-white'>{toastData[1]}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="position-absolute top-50 start-50 translate-middle row">
        <div className="col bg-indigo p-5 rounded-start-3">
          <img className="img-fluid rounded-circle" width={360} src={require("../../img/logo.png")} alt="" />
          <h3 className="fw-bold text-white mt-2 text-center">Bienvenido a Happy Feets</h3>
        </div>
        <div className="col bg-gray rounded-end-3 p-5">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Inicia Sesion</h3>
            <input className="form-control login-input py-2 px-4 rounded mt-5" type="email" name="email" id="txtEmail" placeholder="Email" onChange={handleInput} />
            <input className="form-control login-input py-2 px-4 rounded mt-3" type="password" name="password" id="txtPass" placeholder="Contraseña" onChange={handleInput} />
            <button className="btn btn-primary w-100 mt-5" type="submit">Iniciar Sesion</button>
            <button className="btn btn-primary w-100 mt-2" type="button" onClick={handleSignInWithGoogle}>
              <div className="d-flex justify-content-center align-items-center" >
                <FaGoogle />
                <p style={{ margin: 'auto 0 auto 10px' }}>Inicia Sesión Con Google</p>
              </div>
            </button>
            <Link className="btn btn-thistle w-100 mt-2" to={'/register'} type="button">Registrarse</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login