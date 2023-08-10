import React, { useState, useEffect, useContext } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import CommentList from '../Comments/CommentList'
import CommentInput from '../Comments/CommentInput';
import { formatDate } from '../../../firebase/hooks/CommonHooks'
import { getURL } from '../../../firebase/context/StorageContext'
import { likePost, dislikePost, addCommentToPost, getComments } from "../../../firebase/context/Database/PostsContext";
import { loginContext } from "../../../firebase/context/LoginContext"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverTimestamp } from "firebase/firestore";

function Post({ post }) {
    const LIKE = require("./../../../img/icons/like.png")
    const LIKE_OUTLINE = require("./../../../img/icons/like-outline.png")
    const DISLIKE = require("./../../../img/icons/dislike.png")
    const DISLIKE_OUTLINE = require("./../../../img/icons/dislike-outline.png")
    const { id, postBody, postImage, user, time, comments, likesBy, dislikesBy } = post;
    const { image } = user
    const authContext = useContext(loginContext)

    const uid = authContext.currUser.uid;

    const [userImg, setUserImg] = useState('')
    const [img, setImg] = useState('')
    const [postComments, setPostComments] = useState([])


    const [likesCount, setLikesCount] = useState(likesBy?.length); // Estado para el conteo de likes
    const [likeIcon, setLikeIcon] = useState(likesBy?.includes(uid) ? LIKE : LIKE_OUTLINE);
    const [dislikesCount, setDislikesCount] = useState(dislikesBy?.length); // Estado para el conteo de dislikes
    const [dislikeIcon, setDislikeIcon] = useState(dislikesBy?.includes(uid) ? DISLIKE : DISLIKE_OUTLINE);

    // const [comments, setComments] = useState( post.comments );



    const handleLike = async () => {
        const likeRes = await likePost(post.id, uid);

        setLikeIcon(likeRes > 0 ? LIKE : LIKE_OUTLINE)
        setLikesCount(likesCount + likeRes);

        toast.success("¡Te gusta esta publicación! :)");
    };

    const handleDislike = async () => {
        const dislikeRes = await dislikePost(post.id, uid);

        setDislikeIcon(dislikeRes > 0 ? DISLIKE : DISLIKE_OUTLINE)
        setDislikesCount(dislikesCount + dislikeRes);

        toast.success("¡No te gusta esta publicación! :(");

    };

    async function loadComments() {
        try {
            const commentsData = await getComments(id)
            setPostComments(commentsData)
        } catch (error) {
            console.log("Error al cargar los comentarios: ", error)
        }
    }

    useEffect(() => {

        const cargarImagenes = async () => {
            try {
                setUserImg(await getURL(image))
            }
            catch (error) {
                switch (error.code) {
                    case "storage/invalid-root-operation":
                        setUserImg(image);
                        break;
                    default:
                        console.log(error.code);
                }
            }
            try {
                if (postImage) {
                    setImg(await getURL(postImage))
                }
            }
            catch (error) {
                switch (error.code) {
                    case "storage/invalid-root-operation":
                        setImg(postImage);
                        break;
                    default:
                        console.log(error.code);
                }
            }
        }
        cargarImagenes()
        setPostComments(comments)

    }, [])

    //  const getPostDate = t => `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div className="post bg-wisteria rounded mt-2 mb-4 p-2">
            <div className="d-flex align-items-center">
                <a href={"/profile/" + user.uid}>
                    <img src={userImg} style={{ height: '50px', width: '50px' }}
                        className="rounded-circle img-fluid object-fit-cover" />
                </a>
                <div className="ms-3 d-flex flex-column justify-content-center me-auto">
                    <p className=" m-0"><a href={"/profile/" + user.uid} className="fw-bold text-decoration-none">{user.name}</a> - {formatDate(time)}</p>
                    <p className=" m-0">{user.desc}</p>
                </div>
                <img width="30" src={require("./../../../img/icons/dots.png")} className="img-fluid" style={{ cursor: 'pointer' }} />
            </div>
            <hr className=" my-2" />
            <div className="post-body">
                <p className=" m-0">
                    {postBody}
                </p>
                {postImage?.trim() ? <div className="post-img mt-1">
                    <img className="img-fluid rounded object-fit-contain" src={img} alt="" style={{ width: '100%', maxHeight: '768px' }} />
                </div> : null}
                <div className="w-50 d-flex justify-content-around mt-3">
                    <div className="d-flex align-items-center text-decoration-none" style={{ cursor: 'pointer' }} onClick={handleLike}>
                        <img className="img-fluid" width="28"
                            src={likeIcon} alt="" />
                        <span className=" ms-2">{likesCount ?? 0}</span>
                    </div>
                    <div className="d-flex align-items-center text-decoration-none" style={{ cursor: 'pointer' }} onClick={handleDislike}>
                        <img className="img-fluid" width="28"
                            src={dislikeIcon} alt="" />
                        <span className=" ms-2">{dislikesCount ?? 0}</span>
                    </div>
                    <div className="d-flex align-items-center text-decoration-none" style={{ cursor: 'pointer' }}>
                        <img className="img-fluid" width="28"
                            src={require("./../../../img/icons/comments.png")} alt="" />
                        <span className=" ms-2">{postComments.length}</span>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
            </div>
            <hr className=" my-3" />
            <CommentInput user={user} postId={id} onComment={loadComments} />
            {postComments.length > 0 &&
                <CommentList postId={id} comments={postComments} />}
        </div>
    )
}

export default Post