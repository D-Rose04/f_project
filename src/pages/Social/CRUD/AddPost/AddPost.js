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
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';


function PostDetails() {
    const navigate = useNavigate();
    const toAdd = () => navigate('/social');

    const authContext = useContext(loginContext)
    const [postBody, setPostBody] = useState("");
    const [postImage, setPostImage] = useState("");
    const [sendingPost, setSendingPost] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const uid = authContext.currUser.uid;

        try {
            setSendingPost(true)
            await addPost(uid, postBody, postImage);

            setPostBody("");
            setPostImage("");

            toast.success("¡Agregaste una publicación! :)");

        } catch (error) {
            console.error("Error al agregar la publicación:", error);
        }
        setSendingPost(false)
        toAdd()
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
                        onImageSet={(file) => setPostImage(file)} />
                    <div className="mb-3">
                        <textarea type="text" className="form-control" rows={4} style={styles.customInput} placeholder='Descripción'
                            value={postBody}
                            onChange={(event) => setPostBody(event.target.value)}></textarea>
                    </div>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
                </form>
            </Modal.Body>
            <Modal.Footer className='bg-indigo'>
                <Button className='d-flex justify-content-between' onClick={handleSubmit} disabled={sendingPost}>{sendingPost ? <UseAnimations animation={loading} strokeColor='white' /> : null} Agregar</Button>
                <Button onClick={toAdd} variant='danger'>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostDetails