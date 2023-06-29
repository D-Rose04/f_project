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
        const menuItems = document.getElementById( 'menu-items' )
        const allWithClass = Array.from(
            menuItems.getElementsByClassName( 'react-wavy-transitions__wavy-link' )
        );

        allWithClass.forEach( el => {
            el.classList.add( 'menu-item' );
        } );
        console.log(currUser);
    }

    const handleLogOut = () => {
        SignOut();
        navigate( "/login" );
    }
    useEffect( () => { }, [] );

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
                            <div></div>
                        </Offcanvas.Header>
                        <div className='user-info d-flex align-items-center'>
                            <div className='user-profile-photo'>
                                <img referrerPolicy='no-referrer' src={currUser.photoURL} />
                            </div>
                            <div className='display-name d-flex flex-column justify-content-center'>
                                <p style={{ margin: '5px 0 -5px 0',color:'#ffffff' }}>{currUser.displayName}</p>
                                <div onClick={handleShow} style={{margin: '-2px 0 0 0'}}>
                                    <WavyLink to="/configuracion" direction='down' color="#7710ee">
                                        <p style={{
                                            fontSize: '10pt',
                                            color: '#39b6ff',
                                        }}>Configuración</p>
                                    </WavyLink>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-column menu-items-container justify-content-between'>
                            <div className='d-flex flex-column' id='menu-items'>
                                <div onClick={handleShow}><WavyLink to="/" direction='down' color="#262A53"><p >Inicio</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/perfil" direction='down' color="#262A53"><p >Perfil</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/social" direction='down' color="#262A53"><p >Social</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/perdidos" direction='down' color="#262A53"><p >Mascotas Perdidas</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/adopcion_temporal" direction='down' color="#262A53"><p >Adopción Temporal</p></WavyLink></div>
                                <div onClick={handleShow}><WavyLink to="/mascotas" direction='down' color="#262A53"><p>Mascotas Disponibles</p></WavyLink></div>
                            </div>
                            <div>
                                <input type='button' style={
                                    {
                                        display: 'block',
                                        width: '95%',
                                        margin: '0 auto 85px auto',
                                        padding: '5px 0',
                                        backgroundColor: '#262A53',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px'
                                    }
                                } value='Cerrar Sesión' onClick={handleLogOut}></input>
                            </div>
                        </div>
                    </Offcanvas>
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
