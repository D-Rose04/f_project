import React, { useEffect, useState } from 'react'
import './CommentInput.css'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { DEFAULT_USER_IMAGE } from '../../../utils/constants';
import { addCommentToPost } from '../../../firebase/context/Database/PostsContext';
import { serverTimestamp , Timestamp } from "@firebase/firestore"; 

function CommentInput ( { user, postId} ) {
    const { currUser, getUser } = UseLoginContext();
    const [image, setImage] = useState();
    const autoGrowInput = ( element ) => {
        element.style.height = "5px";
        element.style.height = ( element.scrollHeight ) + "px";
    }

  const [commentContent, setCommentContent] = useState("");
 
  const handleInputChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const timestamp = Timestamp.now();

    const userData = await getUser(currUser.uid);

    const commentData = {
      body: commentContent,
      time: timestamp,
      user: {
        img: userData.imgUrl !== undefined ? userData.imgUrl : userData.photoURL,
        name: `${userData.name} ${
          userData.lastName !== undefined ? userData.lastName : userData.lastname
        }`,
      },
    };
   
    await addCommentToPost(postId, commentData);

    setCommentContent('');
  };

    useEffect( () => {
        const loadData = async () => {
            const userData = await getUser( currUser.uid );
            try {
                if ( !userData.providerImage ) {
                    userData.imgUrl = userData.imgUrl !== undefined && userData.imgUrl !== "" ? userData.imgUrl : DEFAULT_USER_IMAGE;
                }
                else {
                    userData.imgUrl = currUser.photoURL;
                }
                setImage( userData.imgUrl );
            }
            catch ( Exception ) {
                console.log( Exception );
            }
        }

        loadData()
    }, [] )

    return (
        <div className="d-flex bg-sblue rounded-5 p-2 ">
            <a href="#">
                <img className="img-fluid rounded-circle" style={{ width: '50px', height: '40px' }}
                    src={image} alt="" />
            </a>
            <textarea className="form-control comment-input" rows="1" type="text" name="comment"
                id="txtComment" onChange={handleInputChange} placeholder="Ingresa un comentario"></textarea>
            <a className="align-self-center" href="#" onClick={handleSubmit}> 
                <img className="img-fluid" width="35"
                    src={require( "./../../../img/icons/send.png" )} alt="" />
            </a>
        </div>
    )
}
export default CommentInput