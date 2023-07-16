import React, { useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import PetCard from '../../components/app/PetCard/PetCard'
import { Button } from 'react-bootstrap'

function LostPets() {
  const navigate = useNavigate()
  const handleShow = () => navigate('add-pet')

  const petList = [
    {
      id: 1,
      image: 'https://images.placeholders.dev/?width=220&height=220',
      name: 'Firulais',
      race: 'Labrador',
      age: [2, 'y'],
      location: 'Villa Juana'
    },
    {
      id: 2,
      image: 'https://images.placeholders.dev/?width=220&height=220',
      name: 'Cloe',
      race: 'Pitbull',
      age: [2, 'y'],
      location: 'Gualey'
    },
    {
      id: 3,
      image: 'https://images.placeholders.dev/?width=220&height=220',
      name: 'Firulais',
      race: 'Labrador',
      age: [3, 'w'],
      location: 'Villa Juana'
    },
    {
      id: 4,
      image: 'https://images.placeholders.dev/?width=220&height=220',
      name: 'Firulais',
      race: 'Labrador',
      age: [7, 'm'],
      location: 'Villa Juana'
    },
    {
      id: 5,
      image: 'https://images.placeholders.dev/?width=220&height=220',
      name: 'Firulais',
      race: 'Labrador',
      age: [1, 'y'],
      location: 'Villa Juana'
    },
    {
      id: 6,
      image: 'https://images.placeholders.dev/?width=220&height=220',
      name: 'Firulais',
      race: 'Labrador',
      age: [2, 'y'],
      location: 'Villa Juana'
    },

  ]

  const [setTitle, setSidebar, setSidebarCols] = useOutletContext()
  
  useEffect(() => {
    setTitle("Mascotas perdidas")
    setSidebarCols(2)
    setSidebar(<Button variant='primary' onClick={handleShow}>Agregar</Button>)
  }, [])

  return (
    <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
      {petList.map(p => <PetCard key={p.id} id={p.id} name={p.name} image={p.image} age={p.age} race={p.race} location={p.location} />)}
      <Outlet />
    </div>
  )
}

export default LostPets