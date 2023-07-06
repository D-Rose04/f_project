import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker';
import { useNavigate } from 'react-router-dom';
import styles from './AddLostPet.styles'

function AddLostPet() {
    const navigate = useNavigate();
    const toLostPets = () => navigate('..');

    const handleSubmit=()=>{

    }
    return (
        <Modal size='lg' show={true} onHide={toLostPets} dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header className='bg-indigo' closeButton>
                <Modal.Title className='text-white'>
                    Agregar Mascota Perdida
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-indigo px-5'>
                <form>
                    <ImagePicker className="mb-3" name="image" controlId={"imgPickInput"} />
                    <div className="mb-3">
                        <input type="text" className="form-control" style={styles.customInput} placeholder='Nombre' />
                    </div>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Animal</option>
                            <option value="dog">Perro</option>
                            <option value="cat">Gato</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" style={styles.customInput} placeholder='Raza' />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" style={styles.customInput} placeholder='Donde vive'></textarea>
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" style={styles.customInput} placeholder='Visto por ultima vez'></textarea>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" style={styles.customInput} placeholder='Nombre' />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='bg-indigo'>
                <Button onClick={handleSubmit}>Agregar</Button>
                <Button onClick={toLostPets} variant='danger'>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddLostPet