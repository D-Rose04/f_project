import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link, Outlet, useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import styles from './LostPetDetails.styles'
import { Button } from 'react-bootstrap'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import { getLostPet, markPetAsFound } from '../../../firebase/context/Database/PetsContext'
import { getURL } from '../../../firebase/context/StorageContext'

function LostPetDetails() {
  const [lostPet, setLostPet] = useState({})
  const [loadingPet, setLoadingPet] = useState(true)
  const [sending, setSending] = useState(false)

  const [setTitle, setSidebar] = useOutletContext()
  const { petId } = useParams()
  const { currUser } = UseLoginContext()
  const location = useLocation()
  const attrRef = useRef()

  const navigate = useNavigate()

  async function loadPet() {
    const petData = await getLostPet(petId)
    console.log(petData)
    if (petData == null) {
      setLostPet({
        name: 'No encontrado',
        uid: currUser.uid,
        description: 'Animal no encontrado, enlace erroneo'
      })
      return
    }

    setLostPet(petData)
    setLoadingPet(false)
  }

  async function petFound() {
    setSending(true)
    await markPetAsFound(petId)
    setSending(false)
    await loadPet()
  }

  useEffect(() => {
    setTitle("Animal Perdido")
    setSidebar(<Link className='text-decoration-none' to={location.pathname.includes('my-pets') ? '/my-pets/lost-pets' : '/lost-pets'}>
      <div className={'bg-indigo d-flex justify-content-start align-items-center p-1 mb-1 ms-1 rounded-5'} style={{ backgroundColor: 'var(--color-thistle-d)' }}>
        <span className={'flex-grow-1 ms-2 text-decoration-none'}>Volver</span>
      </div>
    </Link>)
  }, [])

  useEffect(() => {
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
            <div className='flex-grow-1' style={styles.petImg}>
              <img className='object-fit-contain rounded-3' src={lostPet.image} style={{ width: '100%', height: attrRef?.current?.offsetHeight }} />
            </div>
            <div className='flex-shrink-1 d-flex flex-column justify-content-between bg-wisteria pt-3 rounded-3 p-3' ref={attrRef} style={{ height: 'fit-content' }}>
              <div className='d-flex align-items-center mb-2'>

                <h3 className='m-0 p-0 ms-2'>{lostPet.name}</h3>
              </div>
              <div className='d-flex flex-grow-1 justify-content-between fs-6'>
                <ul className='d-flex flex-column justify-content-evenly'>
                  <li><b>Animal:</b> {lostPet.animal}</li>
                  <li><b>Raza:</b> {lostPet.race}</li>
                  <li><b>Tamaño:</b> {lostPet.size}</li>
                  <li><b>Sexo:</b> {lostPet.sex}</li>
                  <li><b>Provincia:</b> {lostPet.province}</li>
                  <li><b>Municipio:</b> {lostPet.municipality}</li>
                  <li><b>Contacto:</b> {lostPet.phone}</li>
                </ul>
              </div>
              {lostPet.found ?
                <h4 className='text-white fw-bold'>Encontrado</h4> :
                currUser.uid != lostPet.uid ?
                  <Button onClick={() => navigate('found')} className='mt-3'>Encontre tu mascota</Button> :
                  <Button onClick={petFound} className='d-flex justify-content-around mt-3' disabled={sending}>{sending && <UseAnimations animation={loading} strokeColor='white' />} Marcar como encontrado</Button>}
            </div>
            <Outlet context={[lostPet.name]} />
          </div>
          <div className='mb-1 bg-wisteria pt-3 rounded-3 p-3'>
            <h5 className='text-white'>Descripcion</h5>
            <p className='text-white'>
              {lostPet.description}
            </p>
          </div>
          <div className='mb-3 bg-wisteria pt-3 rounded-3 p-3'>
            <h5 className='text-white'>Visto por ultima vez</h5>
            <p className='text-white'>
              {lostPet.exactLocation}
            </p>
          </div>
        </>}
    </>
  )
}

export default LostPetDetails