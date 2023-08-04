import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import ImagePicker from '../../../../components/layout/ImagePicker/ImagePicker';
import { useNavigate } from 'react-router-dom';
import styles from './AddPost.styles'
import { loginContext } from '../../../../firebase/context/LoginContext'
import { addPost } from '../../../../firebase/context/Database/PostsContext'
// import { getURL } from '../../../firebase/context/StorageContext'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function PostDetails() {
    const navigate = useNavigate();
    const toAdd = () => navigate('..');
 
    const authContext = useContext(loginContext)
    const [postBody, setPostBody] = useState("");
    const [postImage, setPostImage] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const uid = authContext.currUser.uid;
    
        try {
          await addPost(uid, postBody, postImage);
    
          setPostBody("");
          setPostImage("");

        toast.success("¡Agregaste una publicación! :)");
    
        } catch (error) {
          console.error("Error al agregar la publicación:", error);
        }
    };

    return (
        <Modal size='lg' show={true} onHide={toAdd} dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header className='bg-indigo' closeButton>
                <Modal.Title className='text-white'>
                    Agrega una Publicación
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-indigo px-5'>
                <form>
                    <ImagePicker className="mb-3" title="Seleccionar Imagen" name="image" controlId={"imgPickInput"} 
                    onImageSet={(file) => setPostImage(file)}/>
                    <div className="mb-3">
                        <input type="text" className="form-control" style={styles.customInput} placeholder='Descripción' 
                        value={postBody}
                        onChange={(event) => setPostBody(event.target.value)}/>
                    </div>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
                </form>
            </Modal.Body>
            <Modal.Footer className='bg-indigo'>
                <Button onClick={handleSubmit}>Agregar</Button>
                <Button onClick={toAdd} variant='danger'>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostDetails