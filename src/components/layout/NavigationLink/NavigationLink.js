import React from 'react'
import { Link } from 'react-router-dom';

function NavigationLink({ children, href, icon, className }) {
    const image = require('./../../../img/icons/' + icon + '.png');
    return (
        <Link className={className} to={href}>
            <img width="30" className="img-fluid rounded-circle" src={image}
                alt="" />
            <span className="navigation-link">{children}</span>
        </Link>
    )
}

export default NavigationLink