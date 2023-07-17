import React from 'react'
import { Link } from 'react-router-dom'

function ProfilePicture({ pictureImg, profileUrl }) {
    return (
        <div className="dropdown ms-3">
            <Link to={profileUrl} role="button">
                <img className="img-fluid rounded-circle object-fit-cover" width={60} height={60}
                    src={pictureImg} alt="" style={{ height: "60px", maxHeight: "60px" }} />
            </Link>
            <ul className="dropdown-menu dropdown-menu-end mt-3">
                <li><Link className="dropdown-item text-dark" to="/profile">Perfil</Link></li>
                <li><Link className="dropdown-item text-dark" to="#">Configuracion</Link></li>
                <li><Link className="dropdown-item text-dark" to="#">Cerrar sesion</Link></li>
            </ul>
        </div>
    )
}

export default ProfilePicture