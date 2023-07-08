import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker'
import { useNavigate } from 'react-router-dom'
import styles from './LostPetFound.styles'

function LostPetFound() {

    const navigate=useNavigate()
    const toPetLostDetails=()=>navigate("..")
    
    const handleSubmit=()=>{

    }

  return (
    <Modal size='lg' show={true} onHide={toPetLostDetails} dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header className='bg-indigo' closeButton>
                <Modal.Title className='text-white'>
                    ¿Encontraste a Firulais?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-indigo px-5'>
                <form>
                    <ImagePicker className="mb-3" title="Sube una imagen (obligatorio)" name="image" controlId={"imgPickInput"} />
                    <div className="mb-3">
                        <textarea className="form-control" style={styles.customInput} placeholder='Donde lo encontraste'></textarea>
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" style={styles.customInput} placeholder='(Opcional) Agrega una nota y/o condicion de como lo encontraste'></textarea>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='bg-indigo'>
                <Button onClick={handleSubmit}>Enviar</Button>
                <Button onClick={toPetLostDetails} variant='danger'>Cancelar</Button>
            </Modal.Footer>
        </Modal>
  )
}

export default LostPetFound