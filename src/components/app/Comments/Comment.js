import React from 'react'

function Comment({ user, time, body }) {

    const getCommentDate = t => `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div class="comment p-2 rounded-4 bg-indigo">
            <div class="d-flex justify-content-between align-items-center">
                <a href="#">
                    <img class="img-fluid rounded-circle"
                        src={user.image}
                        alt="" />
                </a>
                <p class="m-0 ms-3 me-auto"><span class="fw-bold">{user.name}</span> - {getCommentDate(time)}
                </p>
                <a href="#">
                    <img width="30" class="img-fluid"
                        src="img/icons/reply.png"
                        alt="" />
                </a>
            </div>
            <p class="m-0">
                {body}
            </p>
        </div>
    )
}

export default Comment