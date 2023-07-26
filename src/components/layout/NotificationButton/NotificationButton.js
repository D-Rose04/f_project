import React from 'react'
import { Link } from 'react-router-dom';

function NotificationButton({ image, count, href }) {
    const img = require('./../../../img/icons/' + image + '.png');
    return (
        <Link className="position-relative ms-3" to={href} >
            <img width="30" className="rounded-circle img-fluid"
                src={img} alt="" />
            <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-thistle">{count}</span>
        </Link>
    )
}

export default NotificationButton