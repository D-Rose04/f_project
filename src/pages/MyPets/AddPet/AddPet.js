import React from 'react'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import ImagePicker from '../../../components/layout/ImagePicker/ImagePicker';

function AddPet() {
    const navigate = useNavigate();
    const toMyPets = () => navigate('..');
    return (
        <Modal size='lg' show={true} onHide={toMyPets} dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImagePicker />
        </Modal.Body>
      </Modal>
    )
}

export default AddPet