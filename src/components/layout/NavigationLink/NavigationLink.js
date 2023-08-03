import React from 'react'
import { Link } from 'react-router-dom';
import { UseLoadingContext } from '../../../firebase/hooks/UseLoading';

function NavigationLink ( { children, href, icon, className } ) {
    const { handleClick } = UseLoadingContext();
    const image = require( './../../../img/icons/' + icon + '.png' );
    return (
        <Link className={className} to={href} onClick={handleClick}>
            <img width="30" className="img-fluid rounded-circle" src={image}
                alt="" />
            <span className="navigation-link">{children}</span>
        </Link>
    )
}

export default NavigationLink