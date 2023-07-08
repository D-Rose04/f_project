import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link, Outlet, useOutletContext, useNavigate } from 'react-router-dom'
import styles from './LostPetDetails.styles'
import { Button } from 'react-bootstrap'

function LostPetDetails() {
  const [setTitle, setSidebar] = useOutletContext()
  const { petId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    setTitle("Animal Perdido")
    setSidebar(<Link to="lost-pets" className='btn btn-primary'>Volver atras</Link>)
  }, [])
  return (
    <div className='d-flex flex-column flex-lg-row py-2 gap-1'>
      <div className='flex-grow-1' style={styles.petImg}>
        <img className='img-fluid rounded-3' width="100%" src='https://www.hasindia.org/img/news/2021/story-of-a-street-dog.jpg' />
      </div>
      <div className='flex-grow-1 d-flex flex-column bg-wisteria pt-3 rounded-3 p-3' style={styles.petImg}>
        <h3>Firulais</h3>
        <h4>Doberman</h4>
        <h6>Vive en Las Cañitas</h6>
        <h6>Visto por ultima vez en Gualey</h6>
        <h6>Si lo encuentras llamame: 809-847-9572</h6>
        <Button onClick={() => navigate('found')} className='mt-3'>Animal Encontrado</Button>
      </div>
      <Outlet />
    </div>
  )
}

export default LostPetDetails