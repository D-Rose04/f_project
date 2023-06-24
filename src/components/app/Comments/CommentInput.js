import React from 'react'
import './CommentInput.css'

function CommentInput({user, postId}) {

    const autoGrowInput=(element)=> {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      }

    return (
        <div className="d-flex bg-sblue rounded-5 p-2 ">
            <a href="#">
                <img className="img-fluid rounded-circle"
                    src={user.image} alt="" />
            </a>
            <textarea className="form-control comment-input" rows="1" type="text" name="comment"
                id="txtComment" placeholder="Ingresa un comentario"></textarea>
            <a className="align-self-center" href="#">
                <img className="img-fluid" width="35"
                    src={require("./../../../img/icons/send.png")} alt="" />
            </a>
        </div>
    )
}

export default CommentInput