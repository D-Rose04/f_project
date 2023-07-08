import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePopper } from 'react-popper';

function PetCard({ id, image, name, race, age, location, vacuna = false }) {
    const [favorite, setFavorite] = useState(false)
    const favImage = require(favorite ? "./../../../img/icons/heart-fill.png" : "./../../../img/icons/heart-empty.png");

    const [cant, ud] = age;
    let time = cant
    switch (ud) {
        case 'w': time += cant > 1 ? ' semanas' : ' semana'; break;
        case 'm': time += cant > 1 ? ' meses' : ' mes'; break;
        case 'y': time += cant > 1 ? ' años' : ' año'; break;
    }

    useEffect(()=>{
console.log(id)
    },[])

    return (
        <div className="col">
            <Card>
                <Link to={''+id}><Card.Img variant="top" src={image} /></Link>


                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Link to={''+id}><Card.Title>{name}</Card.Title></Link>
                        <a href="#" className='align-self-end'>
                            <img width="28" src={favImage} alt=""
                                className="img-fluid" onClick={() => setFavorite(!favorite)} />
                        </a>
                    </div>
                    <Card.Text className='d-flex flex-column mb-1' style={{ color: 'black' }}>
                        <span style={{ color: 'black' }}>{race}</span>
                        <span style={{ color: 'black' }}>{time}</span>
                        <span style={{ color: 'black' }}>{vacuna ? 'Vacunado' : 'No vacunado'}</span>
                    </Card.Text>

                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                    <span className='text-dark'>{location}</span>
                    <a href='#'><img src={require('../../../img/icons/more.png')} className='img-fluid' width={15} /></a>
                </Card.Footer>
            </Card>

        </div>
    )
}

export default PetCard