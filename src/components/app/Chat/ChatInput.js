import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './ChatInput.styles.js'
import { IoMdSend } from 'react-icons/io'
import { BsCardImage } from 'react-icons/bs'
import { FaCircleNotch } from 'react-icons/fa'
import { sendMessage, sendMessageWithImage } from '../../../firebase/context/Database/ChatContext.js'
import { loginContext } from '../../../firebase/context/LoginContext.js'
import { useParams } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import ImagePicker from '../../layout/ImagePicker/ImagePicker.js'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

function ChatInput({ layoutContentRef }) {
    const [inputWidth, setInputWidth] = useState(0)
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [sendingMessage, setSendingMessage] = useState(false)

    const imgInputRef = useRef(null)
    const chatInputRef = useRef(null)
    const inputRef = useRef(null)
    const modalInputRef = useRef(null)

    const { chatId } = useParams()
    const authContext = useContext(loginContext)

    useEffect(() => {
        if (image == null) return;
        const newImageUrl = URL.createObjectURL(image);
        setImageURL(newImageUrl);
    }, [image]);

    useEffect(() => {
        setInputWidth(layoutContentRef.current.offsetWidth)
        console.log(chatInputRef)
    }, [inputWidth, layoutContentRef.current?.offsetWidth])

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensaje();
            inputRef.current.style.height = "30px";
        }
    }

    const enviarMensaje = async () => {
        if (sendingMessage) return;
        setSendingMessage(true)
        if (image) {
            await sendMessageWithImage(authContext.currUser.uid, message.trim(), image, chatId)
            imgInputRef.current.value = null
        }
        else if (message.trim()) {
            sendMessage(authContext.currUser.uid, message.trim(), chatId)
        }

        setImage(null)
        setMessage("")
        setSendingMessage(false)
    };

    const autoGrow = () => {
        inputRef.current.style.height = "30px";
        inputRef.current.style.height = (inputRef.current.scrollHeight) + "px";

        if (modalInputRef.current) {
            modalInputRef.current.style.height = "30px";
            modalInputRef.current.style.height = (modalInputRef.current.scrollHeight) + "px";
        }
    }

    const handleModalClose = () => {
        setImage(null)
        imgInputRef.current.value = null
    }

    return (
        <div className="d-flex bg-sblue rounded-2 p-2 position-fixed bottom-0 mb-3" ref={chatInputRef} style={{ width: inputWidth }}>
            {<input className='d-none' type='file' accept="image/*" ref={imgInputRef} onChange={(e) => { setImage(e.target.files[0]) }} />}
            <span className="align-self-end fs-5" style={{ height: '30px', cursor: 'pointer' }} onClick={() => { imgInputRef.current.click() }}>
                {/* <img className="img-fluid rounded-circle"
                    src="https://images.placeholders.dev/?width=35&height=35" alt="" /> */}
                <BsCardImage />
            </span>
            <textarea
                className="form-control"
                ref={inputRef}
                rows="1"
                type="text"
                name="msg"
                id="txtMessage"
                placeholder="Escribe un mensaje"
                style={styles.chatInput}
                onChange={e => setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKey}
                onInput={autoGrow}></textarea>

            <span className="align-self-end fs-5" style={{ height: '30px', cursor: 'pointer' }} onClick={enviarMensaje}>
                {/* <img className="img-fluid rounded-circle"
                    src="https://images.placeholders.dev/?width=35&height=35" alt="" /> */}
                {sendingMessage ?
                    <UseAnimations animation={loading} strokeColor='white' wrapperStyle={{ height: '30px' }} /> :
                    <IoMdSend />}

            </span>
            <Modal size='lg' show={image} onHide={handleModalClose} dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header className='bg-indigo' closeButton>
                    <Modal.Title className='text-white'>
                        Enviar Imagen
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-3'>
                    <div className={'d-flex flex-column align-items-center mb-3'}>
                        <img className='img-fluid' width={300} src={imageURL ?? require('../../../img/dog-white.png')} onClick={() => imgInputRef.current.click()} alt='Imagen' />
                        {imageURL ? /*<button className='btn btn-primary mt-2' onClick={deleteImage}>Borrar Imagen</button>*/ null : <h6 className='text-white'>Seleccionar Imagen</h6>}
                    </div>
                    <div className="d-flex bg-sblue rounded-2 p-2 mb-3" ref={chatInputRef} style={{ width: '100%' }}>
                        <textarea
                            className="form-control"
                            ref={modalInputRef}
                            rows="1"
                            type="text"
                            name="msg"
                            id="txtMessage"
                            placeholder="Escribe un mensaje"
                            style={styles.chatInput}
                            onChange={e => setMessage(e.target.value)}
                            value={message}
                            onKeyDown={handleKey}
                            onInput={autoGrow}></textarea>

                        <a className="align-self-end fs-5 text-white" href="#" onClick={enviarMensaje}>
                            {sendingMessage ?
                                <UseAnimations animation={loading} strokeColor='white' wrapperStyle={{ height: '30px' }} /> :
                                <IoMdSend />}
                        </a>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default ChatInput