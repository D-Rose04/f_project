import React, { useEffect, useState } from 'react'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import styles from './AdoptPet.styles'
import { getUserByUID } from '../../../firebase/context/Database/UserContext'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import { addAdoptRequest } from '../../../firebase/context/Database/PetsContext'

function AdoptPet() {
    const [user, setUser] = useState({})
    const [loadingUser, setLoadingUser] = useState(true)
    const [adoptData, setAdoptData] = useState({})
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])
    const [sending, setSending] = useState(false)

    const navigate = useNavigate()
    const { petId } = useParams()
    const { currUser } = UseLoginContext()
    const [petName] = useOutletContext()

    const toBack = () => navigate("..")

    function handleInput(e) {
        const { id, value } = e.target
        setAdoptData({ ...adoptData, [id]: value })
    }

    function handleRadio(e) {
        const { name, value } = e.target
        setAdoptData({ ...adoptData, [name]: value })
    }

    function handleCheck(e) {
        const { value, checked } = e.target
        const data = { ...adoptData }

        if (!data.liveWith) {
            data.liveWith = []
        }

        if (checked) {
            data.liveWith.push(value)
        } else {
            const i = data.liveWith.indexOf(value)
            data.liveWith.splice(i, 1)
        }
        setAdoptData(data)
    }

    async function handleSubmit(e) {
        console.log(adoptData)
        if (e) {
            e.preventDefault()
        }

        adoptData.liveWith ??= []

        const { userAge, direction, prevExperience, liveWith, placeType, placeDesc } = adoptData

        if (!userAge || !direction || !prevExperience || !placeType || !placeDesc) {
            setToastData(['Campos vacios', 'Debes rellenar todos los campos', 'danger'])
            setShowToast(true)
            return
        }

        setSending(true)
        const petResponse = await addAdoptRequest(currUser.uid, petId, userAge, direction, prevExperience, liveWith, placeType, placeDesc)

        if (petResponse == "error") {
            setToastData(['Error', 'Error al enviar la solicitud, intentelo de nuevo mas tarde', 'danger'])
            setShowToast(true)
            return
        }

        setToastData(['Solicitud enviada', 'Solicitud enviada con exito', 'success'])
        setShowToast(true)
        navigate("..")
        setSending(false)
    }

    useEffect(() => {
        async function loadUserData() {
            const userData = await getUserByUID(currUser.uid)
            setUser(userData)
            setLoadingUser(false)
        }

        loadUserData()
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
                        ¿Quieres adoptar a {petName}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-5'>
                    {loadingUser ?
                        <div className='row h-100 d-flex justify-content-center align-items-center'>
                            <UseAnimations animation={loading} size={100} strokeColor='white' />
                        </div> :
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                <label className='form-label text-white fs-5 fw-bold'>Rellena todos los datos</label>
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Nombre</label>
                                <input className="form-control" style={styles.customInput} value={user.name} readOnly={true} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Apellido</label>
                                <input className="form-control" style={styles.customInput} value={user.lastName} readOnly={true} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Email</label>
                                <input className="form-control" style={styles.customInput} value={user.email} readOnly={true} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Telefono</label>
                                <input className="form-control" style={styles.customInput} value={user.phone} readOnly={true} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Edad (en años)</label>
                                <input type='number' id='userAge' className="form-control" style={styles.customInput} onInput={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Direccion</label>
                                <textarea className="form-control" id='direction' style={styles.customInput} rows={3} onInput={handleInput}></textarea>
                            </div>
                            <label className='form-label text-white fw-bold'>¿Ha tenido experiencia previa con animales?</label>
                            <div className='mb-3'>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="radio" name="prevExperience" id="prevYes" value={true} onChange={handleRadio} />
                                    <label class="form-check-label text-white ms-1" for="prevYes">
                                        Si
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="radio" name="prevExperience" id="prevNo" value={false} onChange={handleRadio} />
                                    <label class="form-check-label text-white ms-1" for="prevNo">
                                        No
                                    </label>
                                </div>
                            </div>
                            <label className='form-label text-white fw-bold'>¿Con quienes va a convivir el animal ademas de usted?</label>
                            <div className='mb-3'>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="chkDog" value="Perros" onChange={handleCheck} />
                                    <label class="form-check-label text-white" for="chkDog">Perro(s)</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="chkCat" value="Gatos" onChange={handleCheck} />
                                    <label class="form-check-label text-white" for="chkCat">Gato(s)</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="chkOtherAnimal" value="Otro tipo de animal" onChange={handleCheck} />
                                    <label class="form-check-label text-white" for="chkOtherAnimal">Otro tipo de animal</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="chkKids" value="Niños" onChange={handleCheck} />
                                    <label class="form-check-label text-white" for="chkKids">Niño(s)</label>
                                </div>
                            </div>
                            <label className='form-label text-white fw-bold'>Seleccione el tipo de lugar donde va a vivir el animal</label>
                            <div className='mb-3'>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="radio" name="placeType" id="apartment" value='Apartamento' onChange={handleRadio} />
                                    <label class="form-check-label text-white ms-1" for="apartment">
                                        Apartamento
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="radio" name="placeType" id="smallHouse" value='Casa pequeña sin patio amplio' onChange={handleRadio} />
                                    <label class="form-check-label text-white ms-1" for="smallHouse">
                                        Casa pequeña sin patio amplio
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="radio" name="placeType" id="midHouse" value='Casa mediana-grande sin patio amplio' onChange={handleRadio} />
                                    <label class="form-check-label text-white ms-1" for="midHouse">
                                        Casa mediana-grande sin patio amplio
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="radio" name="placeType" id="bigHouse" value='Casa con patio amplio' onChange={handleRadio} />
                                    <label class="form-check-label text-white ms-1" for="bigHouse">
                                        Casa con patio amplio
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className='form-label text-white fw-bold'>Describa el lugar donde va a convivir el animal</label>
                                <textarea className="form-control" id='placeDesc' style={styles.customInput} rows={3} onInput={handleInput}></textarea>
                            </div>
                            <input type='submit' className='d-none' />
                        </form>}
                </Modal.Body>
                <Modal.Footer className='bg-indigo'>
                    <Button className='d-flex justify-content-between' onClick={handleSubmit} disabled={sending}>{sending ? <UseAnimations animation={loading} strokeColor='white' /> : null} Enviar</Button>
                    <Button onClick={toBack} variant='danger'>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdoptPet