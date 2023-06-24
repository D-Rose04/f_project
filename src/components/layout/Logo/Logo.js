import React from 'react'
import { Link } from 'react-router-dom';

function Logo() {
    const logo = require('./../../../img/logo.png');
    return (
        <div className="logo d-flex flex-column align-items-center">
            <Link to={"#"} className="d-flex flex-column align-items-center">
                <img width={90} className="img-fluid rounded-circle" src={logo}
                    alt="" />
                <span className="logo-text mt-2 text-center">Pets Adoption</span>
            </Link>
        </div>
    )
}

export default Logo