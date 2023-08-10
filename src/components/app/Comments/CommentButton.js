import React from 'react'
import { useAccordionButton } from 'react-bootstrap';

function CommentButton({ eventKey }) {
    const toggleComments = useAccordionButton(eventKey, () => { });

    return (

        <div className="d-flex justify-content-end mt-2">
            <span onClick={toggleComments} className="text-decoration-none pe-5" style={{ cursor: 'pointer' }}>Mostrar Comentarios</span>
        </div>
    )
}

export default CommentButton