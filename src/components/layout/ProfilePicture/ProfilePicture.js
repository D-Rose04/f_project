import React from 'react'
import { Link } from 'react-router-dom'

function ProfilePicture({pictureImg}) {
    return (
        <div className="dropdown ms-3">
            <Link to="/profile" role="button">
                <img className="rounded-circle img-fluid"
                    src={pictureImg} alt="" />
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