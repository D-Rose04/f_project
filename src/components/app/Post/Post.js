import React, { useState, useEffect, useContext } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import CommentList from '../Comments/CommentList'
import CommentInput from '../Comments/CommentInput';
import { formatDate } from '../../../firebase/hooks/CommonHooks'
import { getURL } from '../../../firebase/context/StorageContext'
import { likePost, dislikePost, addCommentToPost } from "../../../firebase/context/Database/PostsContext";
import { loginContext } from "../../../firebase/context/LoginContext"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverTimestamp } from "firebase/firestore"; 

function Post ( { post } ) {
    const { id, postBody, postImage, user, time, comments } = post;
    const { image } = user

    const [userImg, setUserImg] = useState( '' )
    const [img, setImg] = useState( '' )

    const authContext = useContext( loginContext )

    const [likesCount, setLikesCount] = useState( post.likes ); // Estado para el conteo de likes
    const [dislikesCount, setDislikesCount] = useState( post.dislikes ); // Estado para el conteo de dislikes

    // const [comments, setComments] = useState( post.comments );

    const uid = authContext.currUser.uid;

    const handleLike = async () => {
        await likePost( post.id, uid );

        setLikesCount( likesCount + 1 );

        toast.success( "¡Te gusta esta publicación! :)" );
    };

    const handleDislike = async () => {
        await dislikePost( post.id, uid );

        setDislikesCount( dislikesCount + 1 );

        toast.success( "¡No te gusta esta publicación! :(" );

    };

    
    useEffect( () => {

        const cargarImagenes = async () => {
            try {
                setUserImg( await getURL( image ) )
            }
            catch ( error ) {
                switch ( error.code ) {
                    case "storage/invalid-root-operation":
                        setUserImg( image );
                        break;
                    default:
                        console.log( error.code );
                }
            }
            try {
                if ( postImage ) {
                    setImg( await getURL( postImage ) )
                }
            }
            catch ( error ) {
                switch ( error.code ) {
                    case "storage/invalid-root-operation":
                        setImg( postImage );
                        break;
                    default:
                        console.log( error.code );
                }
            }
        }
        cargarImagenes()

    }, [] )

    //  const getPostDate = t => `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div className="post bg-wisteria rounded mt-2 mb-4 p-2">
            <div className="d-flex align-items-center">
                <a href="/profile">
                    <img src={userImg} style={{height: '50px', width: '50px'}}
                        className="rounded-circle img-fluid object-fit-cover" />
                </a>
                <div className="ms-3 d-flex flex-column justify-content-center me-auto">
                    <p className=" m-0"><span className="fw-bold">{user.name}</span> - {formatDate( time )}</p>
                    <p className=" m-0">{user.desc}</p>
                </div>
                <a href="#">
                    <img width="30" src={require( "./../../../img/icons/dots.png" )} className="img-fluid" />
                </a>
            </div>
            <hr className=" my-2" />
            <div className="post-body">
                <p className=" m-0">
                    {postBody}
                </p>
                {postImage.trim() ? <div className="post-img mt-1">
                    <img className="img-fluid rounded"
                        src={img} alt="" />
                </div> : null}
                <div className="w-50 d-flex justify-content-around mt-3">
                    <a href="#" className="d-flex align-items-center text-decoration-none" onClick={handleLike}>
                        <img className="img-fluid" width="28"
                            src={require( "./../../../img/icons/like.png" )} alt="" />
                        <span className=" ms-2">{post.likes}</span>
                    </a>
                    <a href="#" className="d-flex align-items-center text-decoration-none" onClick={handleDislike}>
                        <img className="img-fluid" width="28"
                            src={require( "./../../../img/icons/dislike.png" )} alt="" />
                        <span className=" ms-2">{post.dislikes}</span>
                    </a>
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                        <img className="img-fluid" width="28"
                            src={require( "./../../../img/icons/comments.png" )} alt="" />
                        <span className=" ms-2">{comments.length}</span>
                    </a>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
            </div>
            <hr className=" my-3" />
            <CommentInput  user={user} postId={id} />
            {comments.length > 0 &&
                <CommentList postId={id} comments={comments} />}
        </div>
    )
}

export default Post