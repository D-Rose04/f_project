import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup, Modal, Toast, ToastContainer } from 'react-bootstrap';
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditPet.styles'
import { RazasGato, RazasPerro } from '../../../firebase/hooks/CommonHooks';
import { addPet, editPet, getPet } from '../../../firebase/context/Database/PetsContext';
import UseAnimations from 'react-useanimations'
import loadingIcon from 'react-useanimations/lib/loading'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { getURL, uploadPetPicture } from '../../../firebase/context/StorageContext';

function EditPet() {
    const [petData, setPetData] = useState({})
    const [razas, setRazas] = useState([])
    const [provinces, setProvinces] = useState([])
    const [municipalities, setMunicipalities] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(true)

    const timeUnitRef = useRef()

    const { petId } = useParams()

    const navigate = useNavigate();
    const { currUser } = UseLoginContext()

    const toBack = () => navigate('..');
    let setImage

    function handleInput(e) {
        const { id, value } = e.target
        setPetData({ ...petData, [id]: value })
    }

    function handleCheck(e) {
        const { id, checked } = e.target
        const data = { ...petData }

        if (!data.additionalDetails)
            data.additionalDetails = []

        if (checked)
            data.additionalDetails.push(id)
        else {
            const i = data.additionalDetails.indexOf(id)
            data.additionalDetails.splice(i, 1)
        }
        setPetData(data)
    }

    async function handleSubmit(e) {
        if (e) {
            e.preventDefault()
        }

        petData.timeUnit ??= timeUnitRef.current.value
        petData.additionalDetails ??= []
        petData.description ??= ""

        const { image, animal, race, sex, name, age, timeUnit, size, description, province, municipality, additionalDetails } = petData
        let { imageBucket } = petData

        if (!animal || !race || !sex || !name || !age || !timeUnit || !size || !province || !municipality || !additionalDetails) {
            setToastData(['Campos vacios', 'Debes rellenar todos los campos', 'danger'])
            setShowToast(true)
            return
        }

        if (image) {
            //si hay una imagen es que el usuario cambio la imagen
            imageBucket = await uploadPetPicture(image, currUser.uid, petId)
        }

        setSending(true)
        const petResponse = await editPet(petId, imageBucket, animal, name, race, sex, age, timeUnit, size, description, additionalDetails)

        if (!petResponse) {
            setToastData(['Error', 'Error al guardar la mascota', 'danger'])
            setShowToast(true)
            setSending(false)
            return
        }

        setToastData(['Mascota guardada', 'Mascota guardada con exito', 'success'])
        setShowToast(true)
        navigate("..")
        setSending(false)
    }

    useEffect(() => {
        async function loadPetData() {
            const pet = await getPet(petId)

            if (pet == null) {
                setToastData(['Mascota no encontrada', 'No se ha encontrado la mascota solicitada', 'warning'])
                setShowToast(true)
                navigate("..")
                return
            }

            const provRes = await fetch("https://api.digital.gob.do/v1/territories/provinces")
            const provData = await provRes.json()
            setProvinces(provData.data)

            const provCode = provData.data.find(prov => prov.name == pet.province).code
            const munRes = await fetch("https://api.digital.gob.do/v1/territories/municipalities?provinceCode=" + provCode)
            const munData = await munRes.json()
            const data = munData.data

            if (typeof data === 'object' && data !== null) {
                setMunicipalities(Array.isArray(data) ? munData.data : [munData.data])
            } else {
                console.log('La variable no es un array ni un objeto.');
            }

            setImage(await getURL(pet.image))

            setPetData({ ...pet, imageBucket: pet.image, image: null })
            setLoading(false)
        }

        if (petId) {
            loadPetData()
        }
    }, [petId])

    useEffect(() => {

        async function loadProvinces() {
            const response = await fetch("https://api.digital.gob.do/v1/territories/provinces")
            const provData = await response.json()
            setProvinces(provData.data)
        }

        loadProvinces()
    }, [])

    useEffect(() => {
        async function loadMunicipalities() {
            const provCode = provinces.find(prov => prov.name == petData.province).code
            const response = await fetch("https://api.digital.gob.do/v1/territories/municipalities?provinceCode=" + provCode)
            const munData = await response.json()
            const data = munData.data

            if (typeof data === 'object' && data !== null) {
                setMunicipalities(Array.isArray(data) ? munData.data : [munData.data])
            } else {
                console.log('La variable no es un array ni un objeto.');
            }
        }

        if (petData.province) {
            loadMunicipalities()
        }
    }, [petData?.province])

    useEffect(() => {
        switch (petData.animal) {
            case "Perro":
                setRazas(RazasPerro)
                break

            case "Gato":
                setRazas(RazasGato)
                break

            default:
                setRazas([])
                setPetData({ ...petData, race: "Otra" })
                break
        }
    }, [petData.animal])

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
                        Editar Mascota
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-5'>
                    <div className={loading ? 'd-flex justify-content-center' : 'd-none'}>
                        <UseAnimations size={120} animation={loadingIcon} strokeColor='white' />
                    </div>
                    <form onSubmit={handleSubmit} className={loading ? 'd-none' : ''}>
                        <ImagePicker className="mb-3" title="Seleccionar Imagen" name="image" controlId={"imgPickInput"} onImageSet={(img) => setPetData({ ...petData, image: img })} loadImage={(fncSetImg) => setImage = fncSetImg} />
                        <div className="mb-3">
                            <select className="form-select" id='animal' aria-label="Default select example" onChange={handleInput} value={petData?.animal}>
                                <option value={""}>Animal...</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <select disabled={petData?.animal == "Otro"} className="form-select" id='race' onChange={handleInput} value={petData?.race}>
                                <option value={""} selected>Raza...</option>
                                {razas.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                <option value="Otra">Otra (favor especificar en la descripcion)</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <select className="form-select" id='sex' aria-label="Default select example" onChange={handleInput} value={petData?.sex}>
                                <option value={""}>Sexo...</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="text" id='name' className="form-control" style={styles.customInput} placeholder='Nombre' onInput={handleInput} value={petData?.name} />
                        </div>
                        <div className="mb-3">
                            <InputGroup>
                                <input type="number" id='age' className="form-control" style={styles.customInput} placeholder='Edad' onInput={handleInput} value={petData?.age} />
                                <select className="form-select" id='timeUnit' aria-label="Default select example" onChange={handleInput} ref={timeUnitRef} value={petData?.timeUnit}>
                                    <option value="y">Años</option>
                                    <option value="m">Meses</option>
                                    <option value="w">Semanas</option>
                                </select>
                            </InputGroup>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='size' aria-label="Default select example" onChange={handleInput} value={petData?.size}>
                                <option value={""}>Tamaño...</option>
                                <option value="Pequeño">Pequeño</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" id='description' style={styles.customInput} onChange={handleInput} value={petData?.description} placeholder='Descripcion (opcional)'></textarea>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='province' aria-label="Default select example" onChange={handleInput} value={petData?.province}>
                                <option value={""}>Provincia...</option>
                                {provinces.map(prov => <option value={prov.name}>{prov.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='municipality' aria-label="Default select example" onChange={handleInput} value={petData?.municipality}>
                                <option value={""}>Municipio...</option>
                                {municipalities.map(mun => <option value={mun.name}>{mun.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <h5 className='text-white'>Datos adicionales</h5>
                            <label className='d-block text-white'><input className="form-check-input" type="checkbox" id="Vacunado" onChange={handleCheck} checked={petData?.additionalDetails?.includes("Vacunado")} /> Vacunado</label>
                            <label className='d-block text-white'><input className="form-check-input" type="checkbox" id="Desparasitado" onChange={handleCheck} checked={petData?.additionalDetails?.includes("Desparasitado")} /> Desparasitado</label>
                            <label className='d-block text-white'><input className="form-check-input" type="checkbox" id="Castrado" onChange={handleCheck} checked={petData?.additionalDetails?.includes("Castrado")} /> Castrado</label>
                        </div>
                        <input type='submit' className='d-none' />
                    </form>
                </Modal.Body>
                <Modal.Footer className='bg-indigo'>
                    <Button className='d-flex justify-content-between' onClick={handleSubmit} disabled={sending}>{sending ? <UseAnimations animation={loadingIcon} strokeColor='white' /> : null} Agregar</Button>
                    <Button onClick={toBack} variant='danger'>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditPet