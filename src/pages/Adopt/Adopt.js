import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Adopt.css'
import PetCard from '../../components/app/PetCard/PetCard'
import Example from '../../components/app/PetCard/Example'

function Adopt() {
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
  const [setTitle, setSidebar] = useOutletContext()
  useEffect(() => {
    setTitle("Adoptar")
  }, [])
  return (
    <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
      {petList.map(p => <PetCard key={p.id} name={p.name} image={p.image} age={p.age} race={p.race} location={p.location} />)}
    </div>
  )
}

export default Adopt