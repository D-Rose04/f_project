import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MyPetsLink from './MyPetsLink'

function MyPetsSidebar() {

    return (
        <>
            {/* <Button variant='primary' onClick={() => navigate('/my-pets/add-pet')}>Agregar</Button> */}
            <MyPetsLink to={'/my-pets'}>Adopciones</MyPetsLink>
            <MyPetsLink to={'/my-pets/favorites'}>Favoritos</MyPetsLink>
            <MyPetsLink to={'/my-pets/lost-pets'}>Perdidos</MyPetsLink>
        </>
    )
}

export default MyPetsSidebar