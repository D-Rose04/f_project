import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import CommentList from '../Comments/CommentList'
import CommentInput from '../Comments/CommentInput';

function Post({ post }) {
    const { id, user, time, postBody, postImage, likes, dislikes, comments } = post;

    const getPostDate = t => `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div className="post bg-wisteria rounded mt-2 mb-4 p-2">
            <div className="d-flex align-items-center">
                <a href="#">
                    <img src={user.image}
                        className="rounded-circle img-fluid" />
                </a>
                <div className="ms-3 d-flex flex-column justify-content-center me-auto">
                    <p className=" m-0"><span className="fw-bold">{user.name}</span> - {getPostDate(time)}</p>
                    <p className=" m-0">{user.desc}</p>
                </div>
                <a href="#">
                    <img width="30" src={require("./../../../img/icons/dots.png")} className="img-fluid" />
                </a>
            </div>
            <hr className=" my-2" />
            <div className="post-body">
                <p className=" m-0">
                    {postBody}
                </p>
                <div className="post-img mt-1">
                    <img className="img-fluid rounded"
                        src={postImage} alt="" />
                </div>
                <div className="w-50 d-flex justify-content-around mt-3">
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                        <img className="img-fluid" width="28"
                            src={require("./../../../img/icons/like.png")} alt="" />
                        <span className=" ms-2">{likes}</span>
                    </a>
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                        <img className="img-fluid" width="28"
                            src={require("./../../../img/icons/dislike.png")} alt="" />
                        <span className=" ms-2">{dislikes}</span>
                    </a>
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                        <img className="img-fluid" width="28"
                            src={require("./../../../img/icons/comments.png")} alt="" />
                        <span className=" ms-2">{comments.length}</span>
                    </a>
                </div>
            </div>
            <hr className=" my-3" />
            <CommentInput user={user} postId={id} />
            {comments.length>0 &&
            <CommentList postId={id} comments={comments} />}
        </div>
    )
}

export default Post