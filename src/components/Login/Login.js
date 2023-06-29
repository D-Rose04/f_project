import React, { useState } from 'react';
import './Login.css';
import { Google } from 'react-bootstrap-icons';
import { UseLoginContext } from '../../firebase-setup/hooks/UseLogin';

import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const { SignIn, SignInWithGoogle, currUser } = UseLoginContext();
    const [user, setUser] = useState( { Email: '', Password: '' } );
    const navigate = useNavigate();

    const handleInput = ( event ) => {
        const { id, value } = event.target;
        setUser( { ...user, [id]: value } );
    };
    const handleSignIn = async () => {
        await SignIn( user.Email, user.Password );
        navigate( "/" );
    }

    const handleSignInWithGoogle = async () => {
        await SignInWithGoogle();
        navigate( "/" );
    }

    return (
        <Container className='d-flex  align-items-center justify-content-center mt-4'>
            <Row className='d-flex loginContainer align-self-center w-75 '>
                <Col className='d-flex justify-content-center'>
                    <Card className='w-75 register-container d-flex flex-row'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <div className='image-container'></div>
                                <div className='main-text'>
                                    <h3>¡Bienvenido a <br/> Happy Feets!</h3>
                                </div>
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center right-side flex-column'>
                            <h3>Inicia Sesión</h3>
                            <Form className=' p-3 '>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="email" placeholder="Correo electrónico" id='Email' onChange={handleInput} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="password" placeholder="Contraseña" id='Password' onChange={handleInput} />
                                </Form.Group>
                                <Form.Group className='d-grid gap-2'>
                                    <Button className='login-btn' onClick={handleSignIn}>Iniciar Sesión</Button>
                                </Form.Group>
                                <Form.Group className='d-grid gap-2 mt-2'>
                                    <Button className='google-login' onClick={() => handleSignInWithGoogle()}><Google className='me-1 mb-1 google-logo' ></Google>Iniciar sesión con google </Button>
                                </Form.Group>
                                <Form.Group className='mt-3'>
                                    <p>No tienes una cuenta? <a href='/signup' className='lnk'>Registrate</a></p>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}
