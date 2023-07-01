import React, { useState } from 'react'
import './Landing.css'
import {FaPaintBrush} from 'react-icons/fa'
import {FaCode} from 'react-icons/fa'
import {FaToggleOn} from 'react-icons/fa'

function Landing() {
    const logoApp = require('../../img/logo.png');
    const miguelPhoto = require('./funny-cat.png');
    const pabloPhoto = require('./funny-bull-terrier.jpg');
    const juanPhoto = require('./juan-horse.png');

    const [email, setEmail] = useState();

    const formHandler = (e) => {
        e.preventDefault();
        setEmail(e.target);
        //  FUNCION QUE NOS MANDE AL CORREO DEL PROYECTO LAS SUGERENCIAS
    }

  return (
    <div className="d-flex flex-column bg-white">
        <div className="firstContainer mb-5">
            <div className="img">
                <div className="d-flex flex-row justify-content-between mt-4 mx-5">
                    <a href='/' className='happyFeetsNav'>Happy Feets</a>
                    <a href='login' className='iniciarSesionText'>Iniciar Sesión</a>
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
                    <h3 className='happyFeetsWelcome'>Bienvenidos a <span>Happy Feets</span></h3>
                    <p className='mt-3'>¿Cuál es la mejor mascota para usted? ¡Descúbrelo ahora!</p>
                    <a href='/register' className='btn btn-outline-dark btnCuenta'>Crear Cuenta</a>
                </div>
                <div className="wave">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
        </div>
        
        <div className="d-flex flex-column align-items-center mt-5 secondContainer">
            <div className='d-flex flex-row justify-content-center mb-5 mt-3'>
                <h2 className='happyFeetsMeaning'>¿Qué es <span>Happy Feets?</span></h2>
            </div>
            <div className=''>
                <div className='secondContainerGrid'>
                    <div className='card bgCard d-flex flex-column align-items-center'>
                        <img className="img-fluid rounded-circle imgCard mt-3" src={logoApp}
                        alt="Logo App" />
                        <p className='mt-3'>Happy Feets</p>
                    </div>
                    <div className='secondContainerText col'>
                        <p>Somos una plataforma digital dedicada a la adopción de animales, facilitando a todos los usuarios publicar sus animales para que sean adoptados por otros, brindandoles seguridad y comodidad. </p>
                        <p>Así mismo como facilitar la publicación a empresas que manejen muchos animales.</p>                        
                    </div>
                </div>
            </div>
            
        </div>
        <div className="bg-indigo thirdContainer">
            <div className='d-flex flex-row justify-content-center mt-5 mb-5'>
                <h3 className='thirdContainerTitle'>Beneficios de Adoptar</h3>
            </div>
            <div className='row mx-5'>
                <div className='thirdContainerGrid mt-5'>
                    <div className='card thirdContainerCard d-flex flex-column align-items-center'>
                        <FaPaintBrush className='iconCard mt-3' />
                        <div className='card-body'>
                            <div className='card-title'>Diseño atractivo</div>
                            <p className='cardText text-center'>Gracias a nuestro diseño atractivo, resulta muy fácil de usar y de guiarse por las distintas funcionalidades y aspectos para no perderse y entender en su totalidad todo lo que les ofrecemos.</p>
                        </div>
                    </div>
                    <div className='card thirdContainerCard d-flex flex-column align-items-center'>
                        <FaCode className='iconCard mt-3' />

                        <div className='card-body'>
                            <div className='card-title'>Codigo seguro</div>
                            <p className='cardText text-center'>Esta plataforma está construida bajo una arquitectura que les brinda a nuestros usuarios los ultimos estandares de seguridad para evitar perder información valiosa. </p>
                        </div>
                    </div>
                    <div className='card thirdContainerCard d-flex flex-column align-items-center'>
                        <FaToggleOn className='iconCard mt-3' />
                        <div className='card-body'>
                            <div className='card-title'>Nuevos rasgos</div>
                            <p className='cardText text-center'>Nuestra plataforma cuenta con novedosas funcionalidades para facilitar la interacción entre los que quieren adoptar y los que tengan animales para que sean adoptados, como lo es nuestro chat entre usuarios.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="fourthContainer">
            <div className='d-flex flex-row justify-content-center mt-5 mb-5'>
                <h3 className='fourthContainerTitle'>Mascotas para Adoptar</h3>
            </div>
            <div className='row mx-5'>
                <div className='fourthContainerGrid mt-5'>
                    <div className='card fourthContainerCard d-flex flex-column align-items-center'>
                    <img className="img-fluid card-img-top fourthContainerImgCard" src={miguelPhoto}
                        alt="Foto Miguel" />
                        <div className='card-body'>
                            
                            <div className='card-title'>Miguel</div>
                            <p className='cardText'>Datos de los ultimos tres posts de animales para adoptar</p>
                        </div>
                    </div>
                    <div className='card fourthContainerCard d-flex flex-column align-items-center'>
                        <img className="img-fluid card-img-top fourthContainerImgCard" src={pabloPhoto}
                        alt="Foto Pablo" />
                        <div className='card-body'>
                            <div className='card-title'>Pablo</div>
                            <p className='cardText'>Datos de los ultimos tres posts de animales para adoptar </p>
                        </div>
                    </div>
                    <div className='card fourthContainerCard d-flex flex-column align-items-center'>
                        <img className="img-fluid card-img-top fourthContainerImgCard" src={juanPhoto}
                        alt="Foto Juan" />
                        <div className='card-body'>
                            <div className='card-title'>Juan</div>
                            <p className='cardText'>Datos de los ultimos tres posts de animales para adoptar </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='lastContainer bg-indigo'>
            <div className='lastContainerGrid mx-5'>
                <div className='lastContainerGridInfo mt-1'>

                        <h6 className='mt-5 fs-3 text-white mb-5'>Happy Feets</h6>
                        <p className='text-white mt-5'>&#169; Happy Feets all rights reserved</p>
                </div>
               
               
               <div className='lastContainerGridForm'>
                <h6 className='fs-3 text-white mt-5 mb-3'>Nuestro espacio</h6>
                <div className='divider'></div>
                <p className='text-white mt-2'>Envía tus sugerencias!</p>
                <form className='row'>
                        <input type='email' id="" className='form-control col mx-2 formRadius' placeholder='Correo'></input>
                        <textarea type='text' id="" className='form-control col mx-2 formRadius' placeholder='Mensaje'></textarea>
                        <button className='col mx-2 formRadius btn btn-thistle' >Enviar</button>
                    </form>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default Landing