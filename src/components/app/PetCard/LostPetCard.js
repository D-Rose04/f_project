import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getURL } from '../../../firebase/context/StorageContext';
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';

function LostPetCard({ children, pet }) {
    const {
        id,
        uid,
        image,
        name,
        animal,
        race,
        sex,
        size,
        description,
        province,
        municipality,
        exactLocation,
        qrBucket,
        phone,
        deleted,
        found
    } = pet

    const [imageUrl, setImageUrl] = useState("")
    const { currUser } = UseLoginContext()

    useEffect(() => {
        async function loadImg() {
            setImageUrl(await getURL(image))
        }

        loadImg()
    }, [])

    return (
        <div className="col">
            <Card bg={deleted ? 'secondary' : null}>
                <Link to={'' + id}><Card.Img className='object-fit-cover' variant="top" height={180} src={imageUrl} /></Link>
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Link to={'' + id}><Card.Title style={{ fontSize: '18px' }}>{name}</Card.Title></Link>
                        {found && <h5 className='text-success'>(Encontrado)</h5>}
                    </div>
                    <Card.Text className='d-flex flex-column mb-1' style={{ color: 'black' }}>
                        <span style={{ color: 'black', fontSize: '14px' }}>{animal}, {race}</span>
                        <span style={{ color: 'black', fontSize: '14px' }}>{sex}</span>
                        <span style={{ color: 'black', fontSize: '14px' }}>{municipality}, {province}</span>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                    <span className='text-dark' style={{ fontSize: '15px' }}>{phone}</span>
                    {children}
                </Card.Footer>
            </Card>
        </div>
    )
}

export default LostPetCard