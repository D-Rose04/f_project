import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';
import { getURL } from '../../../firebase/context/StorageContext';
import { CiCircleMore } from 'react-icons/ci'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { addFav, deletePet, removeFav } from '../../../firebase/context/Database/PetsContext';

function PetCard({ children, pet, isFavorite }) {
    const {
        id,
        uid,
        image,
        animal,
        name,
        race,
        sex,
        age,
        timeUnit,
        province,
        municipality,
        deleted
    } = pet

    const [favorite, setFavorite] = useState(isFavorite)
    const [imageUrl, setImageUrl] = useState("")
    const favImage = require(favorite ? "./../../../img/icons/heart-fill.png" : "./../../../img/icons/heart-empty.png");
    const { currUser } = UseLoginContext()

    let time = age
    switch (timeUnit) {
        case 'w': time += age > 1 ? ' semanas' : ' semana'; break;
        case 'm': time += age > 1 ? ' meses' : ' mes'; break;
        case 'y': time += age > 1 ? ' años' : ' año'; break;
    }

    async function toggleFavorite() {
        if (favorite) {
            await removeFav(currUser.uid, id)
        } else {
            await addFav(currUser.uid, id)
        }

        setFavorite(!favorite)
    }

    useEffect(() => {
        async function loadImg() {
            setImageUrl(await getURL(image))
        }

        loadImg()
        console.log(id)
    }, [])

    return (
        <div className="col">
            <Card bg={deleted ? 'secondary' : null}>
                <Link to={'' + id}><Card.Img className='object-fit-cover' variant="top" height={180} src={imageUrl} /></Link>
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Link to={'' + id}><Card.Title style={{ fontSize: '18px' }}>{name}</Card.Title></Link>
                        {currUser.uid !== uid ?
                            <img
                                width="28"
                                src={favImage} alt=""
                                className="img-fluid align-self-end"
                                onClick={toggleFavorite}
                                style={{ cursor: 'pointer' }} /> :
                            null}
                    </div>
                    <Card.Text className='d-flex flex-column mb-1' style={{ color: 'black' }}>
                        <span style={{ color: 'black', fontSize: '14px' }}>{animal}, {race}</span>
                        <span style={{ color: 'black', fontSize: '14px' }}>{sex}</span>
                        <span style={{ color: 'black', fontSize: '14px' }}>{time}</span>
                    </Card.Text>

                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                    <span className='text-dark' style={{ fontSize: '15px' }}>{province}</span>
                    {children}
                </Card.Footer>
            </Card>

        </div>
    )
}

export default PetCard