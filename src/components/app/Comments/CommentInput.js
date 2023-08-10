import React, { useEffect, useRef, useState } from 'react'
import './CommentInput.css'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { DEFAULT_USER_IMAGE } from '../../../utils/constants';
import { addCommentToPost } from '../../../firebase/context/Database/PostsContext';
import { serverTimestamp, Timestamp } from "@firebase/firestore";

function CommentInput({ user, postId, onComment }) {
    const { currUser, getUser } = UseLoginContext();
    const [image, setImage] = useState();
    const [commentContent, setCommentContent] = useState("");

    const inputRef = useRef()

    const handleInputChange = (event) => {
        setCommentContent(event.target.value);
    };

    function autoGrow() {
        inputRef.current.style.height = "30px";
        inputRef.current.style.height = (inputRef.current.scrollHeight) + "px";
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!commentContent) {
            console.log(commentContent)
            return
        }
        const userData = await getUser(currUser.uid);

        const commentData = {
            body: commentContent,
            user: {
                uid: userData.uid,
                image: userData.imgUrl !== undefined ? userData.imgUrl : userData.photoURL,
                name: `${userData.name} ${userData.lastName !== undefined ? userData.lastName : userData.lastname
                    }`,
            },
        };

        await addCommentToPost(postId, commentData);

        setCommentContent('');
        await onComment()
    };

    useEffect(() => {
        const loadData = async () => {
            const userData = await getUser(currUser.uid);
            try {
                if (!userData.providerImage) {
                    userData.imgUrl = userData.imgUrl !== undefined && userData.imgUrl !== "" ? userData.imgUrl : DEFAULT_USER_IMAGE;
                }
                else {
                    userData.imgUrl = currUser.photoURL;
                }
                setImage(userData.imgUrl);
            }
            catch (Exception) {
                console.log(Exception);
            }
        }

        loadData()
    }, [])

    return (
        <div className="d-flex bg-sblue rounded-5 p-2 ">

            <img className="img-fluid rounded-circle" style={{ width: '50px', height: '40px' }}
                src={image} alt="" />
            <textarea className="form-control comment-input" rows="1" type="text" name="comment" ref={inputRef} onInput={autoGrow}
                id="txtComment" onChange={handleInputChange} value={commentContent} placeholder="Ingresa un comentario" style={{maxHeight: '200px'}}></textarea>
            <span className="align-self-start" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
                <img className="img-fluid" width="35"
                    src={require("./../../../img/icons/send.png")} alt="" />
            </span>
        </div>
    )
}
export default CommentInput