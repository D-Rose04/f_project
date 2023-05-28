import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Google } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { UseLoginContext } from '../../firebase-setup/hooks/UseLogin';
import { INVALID_EMAIL_FORMAT, INVALID_PASSWORD, PASSWORD_DO_NOT_MATCH } from '../../utils/constants';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';

export default function SignUp () {
    const navigate = useNavigate();
    const { SignUp, SignInWithGoogle, updateUserName } = UseLoginContext();
    const emailRegexp = new RegExp( /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ );
    const passwordRegexp = new RegExp( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/ );
    const [validation, setValidation] = useState( {
        message: "",
        isValid: true
    } );
    const [userInfo, setUserInfo] = useState( {
        User: '',
        Name: '',
        LastName: '',
        EmailAddress: '',
        Password: '',
        ConfirmPassword: ''
    } );

    // Handle inputs to change user info 
    const handleInput = ( event ) => {
        const { id, value } = event.target;
        setUserInfo( ( prevState ) => ( { ...prevState, [id]: value } ) );
    };

    const handleEmailBlur = () => {
        const isValid = emailRegexp.test( userInfo.EmailAddress );
        if ( isValid ) { setValidation( { isValid: true } ); return; };
        setValidation( { message: INVALID_EMAIL_FORMAT, isValid: false } );
    };

    const handlePasswordBlur = () => {
        const isValid = passwordRegexp.test( userInfo.Password );
        if ( isValid ) { setValidation( { isValid: true } ); return; };
        setValidation( { message: INVALID_PASSWORD, isValid: false } );
    };

    const handleConfirmPassword = () => {
        const isValid = userInfo.Password === userInfo.ConfirmPassword;
        if ( isValid ) { setValidation( { isValid: true } ); return; };
        setValidation( { message: PASSWORD_DO_NOT_MATCH, isValid: false } );
    };

    const Register = () => {
        try {
            // Create a new account 
            SignUp(
                userInfo.EmailAddress,
                userInfo.Password
            )
                .then( () => updateUserName( `${userInfo.Name}` ) )
                .then( () => navigate( "/" ) );
        }
        catch ( e ) {
            alert( e );
        }
    }
    useEffect( () => { }, [validation] );

    return (
        <Container className='d-flex justify-content-center mt-5'>
            <Row className='d-flex align-self-center w-50'>
                <Col className='d-flex justify-content-center'>
                    <Card className='w-75'>
                        <Card.Title className='text-center mb-3  mt-5'>
                            <h3>Registrate</h3>
                        </Card.Title>
                        <div className='d-flex align-items-center message-box' style={{ visibility: validation.isValid ? "hidden" : "visible" }}>
                            <p>{validation.message}</p>
                        </div>
                        <Form className=' p-3 '>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Usuario" id='User' onChange={handleInput} required autoComplete='username' />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Nombre" id='Name' onChange={handleInput} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Apellido" id='LastName' onChange={handleInput} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Correo electrónico" id='EmailAddress' onChange={handleInput} onBlur={handleEmailBlur} aria-invalid={validation.isValid} required autoComplete='email' />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña" id='Password' onChange={handleInput} onBlur={handlePasswordBlur} required autoComplete='new-password' />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Confirmar contraseña" id='ConfirmPassword' onChange={handleInput} onBlur={handleConfirmPassword} required autoComplete='new-password' />
                            </Form.Group>
                            <Form.Group className='d-grid gap-2'>
                                <Button variant="success" onClick={() => Register()}>Registrarse</Button>
                            </Form.Group>
                            <Form.Group className='d-grid gap-2 mt-2'>
                                <Button variant="outline-dark" onClick={SignInWithGoogle}><Google className='me-1 mb-1' ></Google>Registrate con google </Button>
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}
