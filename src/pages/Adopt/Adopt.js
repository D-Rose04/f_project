import React, { useEffect } from 'react'
import PetCard from '../../components/app/PetCard/PetCard'
import { useOutletContext } from 'react-router-dom'
import './Adopt.css'

function Adopt() {
  const [title, setTitle]=useOutletContext()
  useEffect(()=>{
    setTitle("Adoptar")
  },[])
  return (
    <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
        <PetCard image={"https://images.placeholders.dev/?width=220&height=220"} petName={"Matalais"} petDesc={"Otro perro wey"} />
      </div>
  )
}

export default Adopt