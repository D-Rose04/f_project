import React, { useState, useEffect } from 'react';
import { WavyLink } from 'react-wavy-transitions';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { List } from 'react-bootstrap-icons';
import { UseLoginContext } from '../firebase-setup/hooks/UseLogin';
import { useNavigate } from 'react-router-dom';

export default function Nav () {
    const [show, setShow] = useState( false );
    const { SignOut, currUser } = UseLoginContext();
    const navigate = useNavigate();

    const handleShow = async () => {
        setShow( !show );
    }

    const handleMenuItems = () => {
        const allWithClass = Array.from(
            document.getElementsByClassName( 'react-wavy-transitions__wavy-link' )
        );

        allWithClass.forEach( el => {
            el.classList.add( 'menu-item' );
            el.addEventListener( 'click', setShow );
        } );
        
    }

    const handleLogOut = () => {
        SignOut();
        navigate( "/login" );
    }
    useEffect( () => {

    }, [] );

    return (
        <nav className='d-flex menu'>
            <div className='menu-container'>
                <div className='menu-icon'>
                    <button onClick={handleShow} className='d-flex align-items-center'>
                        {currUser && currUser.uid ? <div className='d-inline'><List size={30} /></div> : <></>}
                        <div><p className='logo d-inline'>Happy Feets</p></div>
                    </button>
                </div>
                {currUser && currUser.uid ? <>

                    <Offcanvas show={show} onShow={handleMenuItems} onHide={handleShow}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <div className='d-flex flex-column menu-items-container justify-content-between'>
                            <div className='menu-items d-flex flex-column'>
                                <div onClick={handleShow}><WavyLink to="/" direction='up' color="#7710ee"><p >Inicio</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/caninos" color="#7710ee"><p >Caninos</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/felinos" direction='up' color="#7710ee"><p >Felinos</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/otros" color="#7710ee"><p >Otros</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/perdidos" direction='up' color="#7710ee"><p >Mascotas Perdidas</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/adopcion_temporal" color="#7710ee"><p >Adopción Temporal</p></WavyLink></div>
                            </div>
                            <div>
                                <input type='button' style={
                                    {
                                        display: 'block',
                                        width: '95%',
                                        margin: '0 auto',
                                        padding: '5px 0',
                                        backgroundColor: '#7710ee',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px'
                                    }
                                } value='Cerrar Sesión' onClick={handleLogOut}></input>
                            </div>
                        </div>
                    </Offcanvas>
                    <div className='userinfo'><p>{currUser.displayName}</p></div>
                </> :
                    <>
                        <div></div>
                        <div>
                            <a className='btn btn-success btn-signup' href='/signup' style={{ margin: '0 15px' }}>Registrate</a>
                            <a className='btn btn-primary text-white btn-login' href='/login'>Inicia Sesión</a>
                        </div>
                    </>
                }


            </div>

        </nav>
    )
}
