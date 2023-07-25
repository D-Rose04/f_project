import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { UseLoadingContext } from '../../../firebase/hooks/UseLoading';
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';

function ProfilePicture({ pictureImg, profileUrl }) {

    const navigate = useNavigate()
    const { setLoading } = UseLoadingContext();
    const { SignOut } = UseLoginContext();

    const handleLogOut = async () => {
        setLoading(true);
        SignOut()
            .then(() => setTimeout(() => {
                navigate('/');
                setLoading(false);
            }, 1500));
    };

    const ProfileImage = React.forwardRef(({ onClick }, ref) => (
        <img
            className="img-fluid rounded-circle object-fit-cover"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            width={60}
            height={60}
            src={pictureImg}
            style={{ height: "60px", maxHeight: "60px", cursor: 'pointer' }}
        />
    ));
    return (
        <>
            <Dropdown className='ms-3'>
                <Dropdown.Toggle variant="success" id="dropdown-basic" as={ProfileImage} />
                <Dropdown.Menu>
                    <Dropdown.Item className='text-dark' onClick={() => navigate(profileUrl)}>Perfil</Dropdown.Item>
                    <Dropdown.Item className='text-dark'>Configuracion</Dropdown.Item>
                    <Dropdown.Item className='text-dark' onClick={handleLogOut}>Cerrar sesion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <div className="dropdown ">
                <Link to={profileUrl} role="button">

                </Link>
                <ul className="dropdown-menu dropdown-menu-end mt-3">
                    <li><Link className="dropdown-item text-dark" to="/profile">Perfil</Link></li>
                    <li><Link className="dropdown-item text-dark" to="#">Configuracion</Link></li>
                    <li><Link className="dropdown-item text-dark" to="#">Cerrar sesion</Link></li>
                </ul>
            </div> */}
        </>

    )
}

export default ProfilePicture