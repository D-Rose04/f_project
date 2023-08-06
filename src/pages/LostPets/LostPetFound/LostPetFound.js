import React, { useState } from 'react'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import styles from './LostPetFound.styles'
import { sendPetFound } from '../../../firebase/context/Database/PetsContext'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

function LostPetFound() {
    const [foundData, setFoundData] = useState({})
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])
    const [sending, setSending] = useState(false)

    const navigate = useNavigate()
    const [petName] = useOutletContext()
    const { currUser } = UseLoginContext()
    const { petId } = useParams()

    const toBack = () => navigate("..")

    function handleInput(e) {
        const { id, value } = e.target
        setFoundData({ ...foundData, [id]: value })
    }

    async function handleSubmit(e) {
        if (e) {
            e.preventDefault()
        }

        const { image, whereFound, note } = foundData

        if (!whereFound) {
            setToastData(['Campos vacios', 'Debes indicar al menos donde lo encontraste', 'danger'])
            setShowToast(true)
            return
        }

        if (!image) {
            setToastData(['Sin imagen', 'Debes tomarle una foto al animal para enviarsela al dueño', 'danger'])
            setShowToast(true)
            return
        }

        setSending(true)
        const petResponse = await sendPetFound(currUser.uid, petId, image, whereFound, note)

        if (petResponse == null) {
            setToastData(['Error al enviar', 'Error al enviar el mensaje, animal no encontrado', 'danger'])
            setShowToast(true)
            return
        }

        setToastData(['Mensaje enviado', 'Mensaje enviado con exito, se redirijira al chat con el dueño', 'success'])
        setShowToast(true)
        setTimeout(() => navigate("/chat/" + petResponse), 3000)
    }

    return (
        <>
            <ToastContainer
                className="p-3"
                position={'top-end'}
                style={{ zIndex: 10000 }}
            >
                <Toast show={showToast} bg={toastData[2]} onClose={() => setShowToast(false)} delay={5000} autohide>
                    <Toast.Body>
                        <h5 className='text-white'>{toastData[0]}</h5>
                        <p className='text-white'>{toastData[1]}</p>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal size='lg' show={true} onHide={toBack} dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header className='bg-indigo' closeButton>
                    <Modal.Title className='text-white'>
                        ¿Encontraste a {petName}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-5'>
                    <form onSubmit={handleSubmit}>
                        <ImagePicker className="mb-3" title="Sube una imagen (obligatorio)" name="image" controlId={"imgPickInput"} onImageSet={(image) => setFoundData({ ...foundData, image })} />
                        <div className="mb-3">
                            <label className='form-label text-white'>¿Donde lo encontraste?</label>
                            <textarea className="form-control" id='whereFound' style={styles.customInput} onInput={handleInput} ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label text-white'>(Opcional) Agrega una nota y/o condicion de como lo encontraste</label>
                            <textarea className="form-control" id='note' style={styles.customInput} onInput={handleInput}></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='bg-indigo'>
                    <Button className='d-flex justify-content-between' onClick={handleSubmit} disabled={sending}>{sending ? <UseAnimations animation={loading} strokeColor='white' /> : null} Enviar</Button>
                    <Button onClick={toBack} variant='danger'>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LostPetFound