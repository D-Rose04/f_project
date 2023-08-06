import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link, Outlet, useOutletContext, useNavigate } from 'react-router-dom'
import styles from './PetDetails.styles'
import { Button } from 'react-bootstrap'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import { addFav, getPet, removeFav } from '../../../firebase/context/Database/PetsContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { getUserByUID } from '../../../firebase/context/Database/UserContext'
import { getURL } from '../../../firebase/context/StorageContext'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

function PetDetails() {
    const [favorite, setFavorite] = useState()
    const [pet, setPet] = useState({})
    const [imageUrl, setImageUrl] = useState(null)
    const [loadingPet, setLoadingPet] = useState(true)

    const [setTitle, setSidebar] = useOutletContext()
    const { petId } = useParams()
    const navigate = useNavigate()
    const { currUser } = UseLoginContext()

    async function toggleFavorite() {
        if (favorite) {
            await removeFav(currUser.uid, petId)
        } else {
            await addFav(currUser.uid, petId)
        }

        setFavorite(!favorite)
    }

    useEffect(() => {
        setTitle("Adoptar mascota")
        setSidebar(<Link className='text-decoration-none' to='..'>
            <div className={'bg-indigo d-flex justify-content-start align-items-center p-1 mb-1 ms-1 rounded-5'} style={{ backgroundColor: 'var(--color-thistle-d)' }}>
                <span className={'flex-grow-1 ms-2 text-decoration-none'}>Volver</span>
            </div>
        </Link>)
    }, [])

    useEffect(() => {
        async function loadPet() {
            const petData = await getPet(petId)
            console.log(petData)
            if (petData == null) {
                setPet({
                    name: 'No encontrado',
                    uid: currUser.uid,
                    description: 'Animal no encontrado, enlace erroneo',
                    additionalDetails: []
                })
                return
            }

            const userData = await getUserByUID(currUser.uid)

            let time = pet.age
            switch (pet.timeUnit) {
                case 'w': time += pet.age > 1 ? ' semanas' : ' semana'; break;
                case 'm': time += pet.age > 1 ? ' meses' : ' mes'; break;
                case 'y': time += pet.age > 1 ? ' años' : ' año'; break;
            }
            petData.time = time

            setImageUrl(await getURL(petData.image))
            setFavorite(userData.favoritePets.includes(petId))
            setPet(petData)
            setLoadingPet(false)
        }

        if (petId) {
            loadPet()
        }
    }, [petId])
    return (
        <>
            {loadingPet ?
                <div className='row h-100 d-flex justify-content-center align-items-center'>
                    <UseAnimations animation={loading} size={100} strokeColor='white' />
                </div> :
                <>
                    <div className='d-flex flex-column flex-lg-row py-2 gap-1'>
                        <div className='' style={styles.petImg}>
                            <img className='img-fluid rounded-3' width="100%" src={imageUrl} />
                        </div>
                        <div className='d-flex flex-column justify-content-between bg-wisteria pt-3 rounded-3 p-3' style={styles.petImg}>
                            <div className='d-flex align-items-center mb-2'>
                                <div onClick={toggleFavorite} style={{ cursor: 'pointer' }} >
                                    {favorite ?
                                        <FaHeart size={28} color='white' /> :
                                        <FaRegHeart size={28} color='white' />}
                                </div>

                                <h3 className='m-0 p-0 ms-2'>{pet.name}</h3>
                            </div>
                            <div className='d-flex flex-grow-1 justify-content-between fs-6'>
                                <ul className='d-flex flex-column justify-content-evenly'>
                                    <li><b>Sexo:</b> {pet.sex}</li>
                                    <li><b>Tamaño:</b> {pet.size}</li>
                                    <li><b>Provincia:</b> {pet.province}</li>
                                </ul>
                                <ul className='d-flex flex-column justify-content-evenly'>
                                    <li><b>Raza:</b> {pet.race}</li>
                                    <li><b>Edad:</b> {pet.time}</li>
                                    <li><b>Municipio:</b> {pet.municipality}</li>
                                </ul>
                            </div>
                            {currUser.uid != pet.uid && <Button onClick={() => navigate('adopt')} className='mt-3'>Adoptar</Button>}
                        </div>
                        <Outlet context={[pet.name]} />
                    </div>
                    <div className='d-flex flex-column flex-lg-row gap-1 mb-2'>
                        <div className='flex-grow-1 bg-wisteria rounded-3 p-3'>
                            <p className='text-white'>
                                {pet.description}
                            </p>
                        </div>
                        {pet.additionalDetails.length > 0 &&
                            <div className=' bg-wisteria rounded-3 p-3'>
                                <h5>Datos adicionales</h5>
                                <ul>
                                    {pet.additionalDetails.map(ad => <li>{ad}</li>)}
                                </ul>
                            </div>}
                    </div>
                </>}
        </>
    )
}

export default PetDetails