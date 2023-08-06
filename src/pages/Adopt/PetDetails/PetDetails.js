import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link, Outlet, useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import styles from './PetDetails.styles'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import { addFav, getAdoptRequests, getPet, removeFav, setPetAsAdopted } from '../../../firebase/context/Database/PetsContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { getUserByUID } from '../../../firebase/context/Database/UserContext'
import { getURL } from '../../../firebase/context/StorageContext'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { checkChatByUsers, createChat, sendMessage, sendMessageWithBucket } from '../../../firebase/context/Database/ChatContext'

function PetDetails() {
    const [favorite, setFavorite] = useState()
    const [pet, setPet] = useState({})
    const [requests, setRequests] = useState([])
    const [imageUrl, setImageUrl] = useState(null)
    const [loadingPet, setLoadingPet] = useState(true)
    const [loadingRequests, setLoadingRequests] = useState(true)
    const [adopting, setAdopting] = useState(false)
    const [message, setMessage] = useState('')
    const [sendingMessage, setSendingMessage] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])

    const [setTitle, setSidebar] = useOutletContext()
    const { petId } = useParams()
    const navigate = useNavigate()
    const { currUser } = UseLoginContext()
    const location = useLocation()
    const attrRef = useRef()

    async function toggleFavorite() {
        if (favorite) {
            await removeFav(currUser.uid, petId)
        } else {
            await addFav(currUser.uid, petId)
        }

        setFavorite(!favorite)
    }

    async function petAdopted() {
        setSendingMessage(true)
        await setPetAsAdopted(petId)

        await Promise.all(requests.map(async req => {
            if (req.status != 'pending') {
                return
            }

            let chatId = await checkChatByUsers(currUser.uid, req.uid)

            if (chatId == null) {
                chatId = await createChat(currUser.uid, req.uid)
            }

            await sendMessageWithBucket(currUser.uid, 'Hola, alguien mas acaba de adoptar a ' + pet.name + ', lo siento', pet.image, chatId)

            if (message) {
                await sendMessage(currUser.uid, message, chatId)
            }
        }))

        setAdopting(false)
        loadPet()
    }

    async function loadPet() {
        const petData = await getPet(petId)
        if (petData == null) {
            setPet({
                name: 'No encontrado',
                uid: currUser.uid,
                description: 'Animal no encontrado, enlace erroneo',
                additionalDetails: []
            })
            setLoadingPet(false)
            return
        }

        const userData = await getUserByUID(currUser.uid)

        let time = petData.age
        switch (petData.timeUnit) {
            case 'w': time += petData.age > 1 ? ' semanas' : ' semana'; break;
            case 'm': time += petData.age > 1 ? ' meses' : ' mes'; break;
            case 'y': time += petData.age > 1 ? ' años' : ' año'; break;
        }
        petData.time = time

        setImageUrl(await getURL(petData.image))
        setFavorite(userData.favoritePets.includes(petId))
        setPet(petData)
        setLoadingPet(false)
    }

    async function loadRequests() {
        setLoadingRequests(true)
        const reqsData = await getAdoptRequests(petId)
        setRequests(reqsData)
        setLoadingRequests(false)
    }

    useEffect(() => {
        setTitle("Adoptar mascota")
        setSidebar(<Link className='text-decoration-none' to={location.pathname.includes("my-pets") ? 'my-pets' : '/'}>
            <div className={'bg-indigo d-flex justify-content-start align-items-center p-1 mb-1 ms-1 rounded-5'} style={{ backgroundColor: 'var(--color-thistle-d)' }}>
                <span className={'flex-grow-1 ms-2 text-decoration-none'}>Volver</span>
            </div>
        </Link>)
    }, [])

    useEffect(() => {
        if (petId) {
            loadPet()
            loadRequests()
        }
    }, [petId])

    useEffect(() => {
        loadRequests()
    }, [location])

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
            {loadingPet ?
                <div className='row h-100 d-flex justify-content-center align-items-center'>
                    <UseAnimations animation={loading} size={100} strokeColor='white' />
                </div> :
                <>
                    <div className='d-flex flex-column flex-lg-row py-2 gap-1'>
                        <div className='flex-grow-1' style={styles.petImg}>
                            <img className='object-fit-contain rounded-3' src={imageUrl} style={{ width: '100%', height: attrRef?.current?.offsetHeight }} />
                        </div>
                        <div className='flex-shrink-1 d-flex flex-column justify-content-between bg-wisteria pt-3 rounded-3 p-3' ref={attrRef} style={{ height: 'fit-content' }}>
                            <div className='d-flex align-items-center mb-2'>
                                {currUser.uid != pet.uid &&
                                    <div onClick={toggleFavorite} style={{ cursor: 'pointer' }} >
                                        {favorite ?
                                            <FaHeart size={28} color='white' /> :
                                            <FaRegHeart size={28} color='white' />}
                                    </div>}

                                <h3 className='m-0 p-0 ms-2 text-wrap'>{pet.name}</h3>
                            </div>
                            <div className='d-flex flex-grow-1 justify-content-between fs-6'>
                                <ul className='d-flex flex-column justify-content-evenly'>
                                    <li><b>Sexo:</b> {pet.sex}</li>
                                    <li><b>Tamaño:</b> {pet.size}</li>
                                    <li className='text-wrap'><b>Provincia:</b> {pet.province}</li>
                                    <li><b>Raza:</b> {pet.race}</li>
                                    <li><b>Edad:</b> {pet.time}</li>
                                    <li className='text-wrap'><b>Municipio:</b> {pet.municipality}</li>
                                </ul>
                            </div>
                            {pet.adopted ?
                                <h4 className='text-white'>Adoptado/a</h4> :
                                currUser.uid != pet.uid ?
                                    <Button onClick={() => navigate('adopt')} className='mt-3'>Adoptar</Button> :
                                    !pet.adopted && <Button onClick={() => setAdopting(true)} className='mt-3'>Marcar como adoptado</Button>}
                        </div>
                        <Outlet context={[pet.name]} />
                    </div>
                    <div className='d-flex flex-column flex-lg-row gap-1 mb-2'>
                        <div className='flex-grow-1 bg-wisteria rounded-3 p-3'>
                            <p className='text-white'>
                                {pet.description ? pet.description : 'Sin descripcion'}
                            </p>
                        </div>
                        {pet.additionalDetails.length > 0 &&
                            <div className=' bg-wisteria rounded-3 p-3'>
                                <h5>Datos adicionales</h5>
                                <ul>
                                    {pet.additionalDetails.map(ad => <li key={ad}>{ad}</li>)}
                                </ul>
                            </div>}
                    </div>
                    {currUser.uid == pet.uid && !pet.adopted &&
                        <div className='bg-wisteria rounded-3 p-3 mb-2'>
                            <div className='bg-sblue rounded-3 p-1'>
                                {loadingRequests ?
                                    <div className='row h-100 d-flex justify-content-center align-items-center'>
                                        <UseAnimations animation={loading} size={80} strokeColor='white' />
                                    </div> :
                                    (requests.length > 0 ?
                                        <table className="table table-primary table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre Completo</th>
                                                    <th scope="col">Telefono</th>
                                                    <th scope="col">Experiencia previa</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requests.map(r => <tr key={r.uid} className='align-middle'>
                                                    <th scope="row">{r.fullName}</th>
                                                    <td>{r.phone}</td>
                                                    <td>{r.prevExperience ? 'Si' : 'No'}</td>
                                                    <td>{r.status == 'pending' ? 'Pendiente' : r.status == 'accepted' ? 'Aceptada' : 'Rechazada'}</td>
                                                    <td>{r.status == 'pending' ? <button className='btn btn-secondary' onClick={() => navigate('request/' + r.id)}>Ver solicitud</button> : null}</td>
                                                </tr>)}
                                            </tbody>
                                        </table> :
                                        <div className='d-flex justify-content-center'>
                                            <h4 className='text-white m-4'>No tienes solicitudes de adopcion aun</h4>
                                        </div>)
                                }
                            </div>
                        </div>}
                </>}

            <Modal size='lg' show={adopting} onHide={() => setAdopting(false)} dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header className='bg-indigo' closeButton>
                    <Modal.Title className='text-white'>
                        ¿Ya adoptaron a {pet.name}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-5'>
                    <form onSubmit={() => { }}>
                        <div className="mb-3">
                            <label className='form-label text-white fw-bold' htmlFor='txtMsg'>Envia un mensaje a todos los que querian adoptar a {pet.name} (Opcional)</label>
                            <textarea className="form-control" id='txtMsg' style={styles.customInput} rows={3} onInput={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='bg-indigo'>
                    <Button className='d-flex justify-content-between' onClick={petAdopted} disabled={sendingMessage}>{sendingMessage ? <UseAnimations animation={loading} strokeColor='white' /> : null} Enviar</Button>
                    <Button onClick={() => setAdopting(false)} variant='danger'>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PetDetails