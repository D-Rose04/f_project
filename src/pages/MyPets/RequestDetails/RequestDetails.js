import React, { useEffect, useState } from 'react'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getUserByUID } from '../../../firebase/context/Database/UserContext'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import { addAdoptRequest, changeRequestStatus, getAdoptRequest, getAdoptRequestByUserAndPet, getPet } from '../../../firebase/context/Database/PetsContext'
import styles from './RequestDetails.styles'
import { checkChatByUsers, createChat, sendMessage, sendMessageWithBucket } from '../../../firebase/context/Database/ChatContext'

function RequestDetails() {
    const [request, setRequest] = useState({})
    const [user, setUser] = useState({})
    const [pet, setPet] = useState({})
    const [loadingReq, setLoadingReq] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])
    const [reqResponse, setReqResponse] = useState(null)
    const [message, setMessage] = useState('')
    const [followToChat, setFollowToChat] = useState(false)
    const [sendingResponse, setSendingResponse] = useState(false)

    const navigate = useNavigate()
    const { petId, requestId } = useParams()
    const { currUser } = UseLoginContext()

    const toBack = () => navigate("..")

    function handleInput(e) {
        const { value } = e.target
        setMessage(value)
    }

    function handleCheck(e) {
        const { checked } = e.target
        setFollowToChat(checked)
    }

    async function acceptRequest() {
        if (!message) {
            setToastData(['Campo vacio', 'Debes enviarle un mensaje al usuario para explicarle tu decision', 'danger'])
            setShowToast(true)
            return
        }

        setSendingResponse(true)
        await changeRequestStatus(requestId, 'accepted')
        let chatId = await checkChatByUsers(currUser.uid, request.uid)

        if (chatId == null) {
            chatId = await createChat(currUser.uid, request.uid)
        }

        await sendMessage(currUser.uid, 'Hola, acepté tu solicitud para adoptar a ' + pet.name, chatId)
        await sendMessageWithBucket(currUser.uid, message, pet.image, chatId)

        if (followToChat) {
            navigate('/chat/' + chatId)
            return
        }

        setToastData(['Respuesta enviada', 'Respuesta enviada con exito', 'success'])
        setShowToast(true)
        setTimeout(() => navigate(".."), 3000)
    }

    async function denyRequest() {
        if (!message) {
            setToastData(['Campo vacio', 'Debes enviarle un mensaje al usuario para explicarle tu decision', 'danger'])
            setShowToast(true)
            return
        }

        setSendingResponse(true)
        await changeRequestStatus(requestId, 'denied')
        let chatId = await checkChatByUsers(currUser.uid, request.uid)

        if (chatId == null) {
            chatId = await createChat(currUser.uid, request.uid)
        }

        await sendMessage(currUser.uid, 'Lo siento, he rechazado tu solicitud para adoptar a ' + pet.name, chatId)
        await sendMessageWithBucket(currUser.uid, message, pet.image, chatId)

        if (followToChat) {
            navigate('/chat/' + chatId)
            return
        }

        setToastData(['Respuesta enviada', 'Respuesta enviada con exito', 'success'])
        setShowToast(true)
        setTimeout(() => navigate(".."), 3000)
    }

    useEffect(() => {
        async function loadRequest() {
            const reqData = await getAdoptRequest(requestId)
            if (!reqData) {
                setLoadingReq(false)
                setRequest(null)
                return
            }

            const userData = await getUserByUID(reqData.uid)
            const petData = await getPet(petId)
            setUser(userData)
            setRequest(reqData)
            setPet(petData)
            setLoadingReq(false)
        }

        loadRequest()
    }, [])

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
                        Solicitud de {user.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-5'>
                    {loadingReq ?
                        <div className='row h-100 d-flex justify-content-center align-items-center'>
                            <UseAnimations animation={loading} size={100} strokeColor='white' />
                        </div> :
                        request ?
                            <form>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Nombre</h6>
                                    <span className='text-white'>{user.name}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Apellido</h6>
                                    <span className='text-white'>{user.lastName}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Email</h6>
                                    <span className='text-white'>{user.email}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Telefono</h6>
                                    <span className='text-white'>{user.phone}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Edad</h6>
                                    <span className='text-white'>{request.userAge} año(s)</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Direccion</h6>
                                    <span className='text-white'>{request.direction}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>¿Ha tenido experiencia previa con animales?</h6>
                                    <span className='text-white'>{request.prevExperience ? 'Si' : 'No'}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>¿Con quienes va a convivir el animal ademas de usted?</h6>
                                    <ul className='text-white'>
                                        {request.liveWith.map(lw => <li>{lw}</li>)}
                                    </ul>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Tipo de lugar donde va a vivir el animal</h6>
                                    <span className='text-white'>{request.placeType}</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className='form-label text-white fw-bold'>Lugar donde va a convivir el animal</h6>
                                    <span className='text-white'>{request.placeDesc}</span>
                                </div>
                            </form> :
                            <div className='row h-100 d-flex justify-content-center align-items-center'>
                                <h5 className='text-white text-center'>Solicitud no encontrada</h5>
                            </div>}
                </Modal.Body>
                <Modal.Footer className='bg-indigo'>
                    {reqResponse ?
                        <div className='flex-grow-1'>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>{reqResponse == 'accept' ? 'Enviale un mensaje al usuario' : 'Razon del rechazo'}</label>
                                <textarea className="form-control" style={styles.customInput} rows={3} placeholder={reqResponse == 'accept' ? 'Me gusta mucho donde va a vivir la mascota...' : 'No me gusta el lugar donde va a vivir la mascota...'} onInput={handleInput}></textarea>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="chkChat" onChange={handleCheck} />
                                    <label className="form-check-label text-white" htmlFor="chkChat">Chatear con el usuario automaticamente</label>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <Button className='d-flex justify-content-between me-2' variant={reqResponse == 'accept' ? 'primary' : 'danger'} onClick={reqResponse == 'accept' ? acceptRequest : denyRequest} disabled={sendingResponse}>{sendingResponse && <UseAnimations animation={loading} strokeColor='white' />} {reqResponse == 'accept' ? 'Aceptar solicitud' : 'Rechazar solicitud'}</Button>
                                <Button variant='primary' onClick={() => setReqResponse(null)}>Atras</Button>
                            </div>
                        </div> :
                        request.status == 'pending' && <>
                            <Button variant='primary' onClick={() => setReqResponse('accept')}>Aceptar solicitud</Button>
                            <Button variant='danger' onClick={() => setReqResponse('deny')}>Rechazar solicitud</Button>
                        </>}

                </Modal.Footer>
            </Modal>
            <Outlet />
        </>
    )
}

export default RequestDetails