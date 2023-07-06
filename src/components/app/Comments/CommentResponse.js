import React from 'react'

function CommentResponse({response}) {
    const {id, user, time, replyBody}=response;
    const getReplyDate = t => `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div className="comment-response d-flex ps-2 mt-2">
            <a className="flex-shrink-0 my-1" href="#"><img className="img-fluid rounded-circle"
                src={user.image}
                alt="" /></a>
            <div className="flex-grow-1 bg-indigo rounded-4 ms-3 p-2 ps-3">
                <div className="d-flex align-items-center">
                    <p className="m-0 me-auto"><span className="fw-bold">{user.name}</span>
                        - {getReplyDate(time)}</p>
                    <a href="#">
                        <img width="30" className="img-fluid"
                            src="img/icons/reply.png"
                            alt="" />
                    </a>
                </div>
                <p className="m-0">
                    {replyBody}
                </p>
            </div>
        </div>
    )
}

export default CommentResponse