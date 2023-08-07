import React, { useEffect, useState } from 'react'
import './CommentInput.css'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { DEFAULT_USER_IMAGE } from '../../../utils/constants';

function CommentInput ( { user, postId } ) {
    const { currUser, getUser } = UseLoginContext();
    const [image, setImage] = useState();
    const autoGrowInput = ( element ) => {
        element.style.height = "5px";
        element.style.height = ( element.scrollHeight ) + "px";
    }

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
                id="txtComment" placeholder="Ingresa un comentario"></textarea>
            <a className="align-self-center" href="#">
                <img className="img-fluid" width="35"
                    src={require( "./../../../img/icons/send.png" )} alt="" />
            </a>
        </div>
    )
}

export default CommentInput