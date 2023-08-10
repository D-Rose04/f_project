import React from 'react'
import { formatDate } from '../../../firebase/hooks/CommonHooks'

function Comment({ user, time, body }) {

    return (
        <div className="comment-response d-flex ps-2 mt-1">
            <a className="flex-shrink-0 my-1" href={"/profile/"}><img className="img-fluid rounded-circle object-fit-cover"
                width={40}
                src={user.image ?? user.img}
                alt=""
                style={{height:'40px'}} /></a>
            <div className="flex-grow-1 bg-indigo rounded-4 ms-2 p-2 ps-3">
                <div className="d-flex align-items-center">
                    <p className="m-0 me-auto"><span className="fw-bold">{user.name}</span> - {formatDate(time)}</p>
                    <a href="#">
                        <img width="30" className="img-fluid"
                            src="img/icons/reply.png"
                            alt="" />
                    </a>
                </div>
                <p className="m-0">
                    {body.replace('<br/>',<br/>)}
                </p>
            </div>
        </div>
    )
}

export default Comment