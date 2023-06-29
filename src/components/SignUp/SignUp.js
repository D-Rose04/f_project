import React, { useState } from 'react';
import './Signup.css';
import { Google } from 'react-bootstrap-icons';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UseLoginContext } from '../../firebase-setup/hooks/UseLogin';

export default function SignUp () 
{
    const { SignUp, SignInWithGoogle, updateUserName } = UseLoginContext();
    const [userInfo, setUserInfo] = useState( {
        User: '',
        Name: '',
        LastName: '',
        EmailAddress: '',
        Password: '',
        ConfirmPassword: ''
    } );
    const navigate = useNavigate();
    // Handle inputs to change user info 
    const handleInput = ( event ) => 
    {
        const { id, value } = event.target;
        setUserInfo( { ...userInfo, [id]: value } );
    };

    const Register = () => 
    {
        try 
        {
            if ( userInfo.Password !== userInfo.ConfirmPassword ) return;

            // Create a new account 
            SignUp(
                userInfo.EmailAddress,
                userInfo.Password
            )
            .then(()=> updateUserName( `${userInfo.Name}` ))
            .then(() => navigate("/") );
            
        } 
        catch ( e ) 
        {
            alert( e );
        }
    }
    return (
        <Container className='d-flex justify-content-center mt-5'>
            <Row className='d-flex  align-self-center'>
                <Col>
                    <Card>
                        <Card.Title className='text-center mb-3  mt-5'>
                            <h3>Registrate</h3>
                        </Card.Title>
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
                                <Form.Control type="email" placeholder="Correo electrónico" id='EmailAddress' onChange={handleInput} required autoComplete='email' />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña" id='Password' onChange={handleInput} required autoComplete='new-password' />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Confirmar contraseña" id='ConfirmPassword' onChange={handleInput} required autoComplete='new-password' />
                            </Form.Group>
                            <Form.Group className='d-grid gap-2'>
                                <Button variant="success" onClick={() => Register()}>Registrarse</Button>
                            </Form.Group>
                            <Form.Group className='d-grid gap-2 mt-2'>
                                <Button variant="outline-dark" onClick={SignInWithGoogle}><Google className='me-1 mb-1' ></Google>Registrate con google </Button>
                            </Form.Group>
                            <Card.Text>
                                {userInfo.Password !== userInfo.ConfirmPassword ? 'Las contraseñas no coinciden ' : ''}
                            </Card.Text>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}
