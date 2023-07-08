import React from 'react'

function Comment({ user, time, body }) {

    const getCommentDate = t => `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div className="comment p-2 rounded-4 bg-indigo">
            <div className="d-flex justify-content-between align-items-center">
                <a href="#">
                    <img className="img-fluid rounded-circle"
                        src={user.image}
                        alt="" />
                </a>
                <p className="m-0 ms-3 me-auto"><span className="fw-bold">{user.name}</span> - {getCommentDate(time)}
                </p>
                <a href="#">
                    <img width="30" className="img-fluid"
                        src="img/icons/reply.png"
                        alt="" />
                </a>
            </div>
            <p className="m-0">
                {body}
            </p>
        </div>
    )
}

export default Comment