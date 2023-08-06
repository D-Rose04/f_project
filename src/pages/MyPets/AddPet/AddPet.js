import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup, Modal, Toast, ToastContainer } from 'react-bootstrap';
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker';
import { useNavigate } from 'react-router-dom';
import styles from './AddPet.styles'
import { RazasGato, RazasPerro } from '../../../firebase/hooks/CommonHooks';
import { addPet } from '../../../firebase/context/Database/PetsContext';
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';

function AddPet() {
    const [petData, setPetData] = useState({})
    const [razas, setRazas] = useState([])
    const [provinces, setProvinces] = useState([])
    const [municipalities, setMunicipalities] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])
    const [sending, setSending] = useState(false)

    const timeUnitRef = useRef()

    const navigate = useNavigate();
    const { currUser } = UseLoginContext()

    const toBack = () => navigate('..');

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

    async function handleSubmit() {
        petData.timeUnit ??= timeUnitRef.current.value
        petData.additionalDetails ??= []
        petData.description ??= ""

        const { image, animal, race, sex, name, age, timeUnit, size, description, province, municipality, additionalDetails } = petData

        if (!animal || !race || !sex || !name || !age || !timeUnit || !size || !province || !municipality || !additionalDetails) {
            setToastData(['Campos vacios', 'Debes rellenar todos los campos', 'danger'])
            setShowToast(true)
            return
        }

        if (!image) {
            setToastData(['Sin imagen', 'Debes seleccionar una imagen de perfil', 'danger'])
            setShowToast(true)
            return
        }

        setSending(true)
        const petResponse = await addPet(currUser.uid, image, animal, name, race, sex, age, timeUnit, size, description, province, municipality, additionalDetails)

        if (petResponse?.message == "add-pet-error") {
            setToastData(['Error', 'Error al guardar la mascota', 'danger'])
            setShowToast(true)
            return
        }

        if (petResponse?.message == "upload-img-error") {
            setToastData(['Error', 'Error al subir la imagen', 'danger'])
            setShowToast(true)
            return
        }

        if (petResponse?.message == "set-img-error") {
            setToastData(['Error', 'Error al guardar la mascota', 'danger'])
            setShowToast(true)
            return
        }

        setToastData(['Mascota guardada', 'Mascota guardada con exito', 'success'])
        setShowToast(true)
        setTimeout(()=>navigate(".."), 3000)
    }

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
                        Agregar Mascota
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-indigo px-5'>
                    <form>
                        <ImagePicker className="mb-3" title="Seleccionar Imagen" name="image" controlId={"imgPickInput"} onImageSet={(img) => setPetData({ ...petData, image: img })} />
                        <div className="mb-3">
                            <select className="form-select" id='animal' aria-label="Default select example" onChange={handleInput}>
                                <option value={""}>Animal...</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <select disabled={petData?.animal == "Otro"} className="form-select" id='race' onChange={handleInput}>
                                <option value={""} selected>Raza...</option>
                                {razas.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                <option value="Otra">Otra (favor especificar en la descripcion)</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <select className="form-select" id='sex' aria-label="Default select example" onChange={handleInput}>
                                <option value={""}>Sexo...</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="text" id='name' className="form-control" style={styles.customInput} placeholder='Nombre' onInput={handleInput} />
                        </div>
                        <div className="mb-3">
                            <InputGroup>
                                <input type="number" id='age' className="form-control" style={styles.customInput} placeholder='Edad' onInput={handleInput} />
                                <select className="form-select" id='timeUnit' aria-label="Default select example" onChange={handleInput} ref={timeUnitRef}>
                                    <option value="y">Años</option>
                                    <option value="m">Meses</option>
                                    <option value="w">Semanas</option>
                                </select>
                            </InputGroup>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='size' aria-label="Default select example" onChange={handleInput}>
                                <option value={""}>Tamaño...</option>
                                <option value="Pequeño">Pequeño</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" id='description' style={styles.customInput} onChange={handleInput} placeholder='Descripcion (opcional)'></textarea>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='province' aria-label="Default select example" onChange={handleInput}>
                                <option value={""}>Provincia...</option>
                                {provinces.map(prov => <option key={prov.name} value={prov.name}>{prov.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='municipality' aria-label="Default select example" onChange={handleInput}>
                                <option value={""}>Municipio...</option>
                                {municipalities.map(mun => <option key={mun.name} value={mun.name}>{mun.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <h5 className='text-white'>Datos adicionales</h5>
                            <label className='d-block text-white'><input className="form-check-input" type="checkbox" id="Vacunado" onChange={handleCheck} /> Vacunado</label>
                            <label className='d-block text-white'><input className="form-check-input" type="checkbox" id="Desparasitado" onChange={handleCheck} /> Desparasitado</label>
                            <label className='d-block text-white'><input className="form-check-input" type="checkbox" id="Castrado" onChange={handleCheck} /> Castrado</label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='bg-indigo'>
                    <Button className='d-flex justify-content-between' onClick={handleSubmit} disabled={sending}>{sending ? <UseAnimations animation={loading} strokeColor='white' /> : null} Agregar</Button>
                    <Button onClick={toBack} variant='danger'>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddPet