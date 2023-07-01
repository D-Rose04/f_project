import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Profile() {
  const [,setTitle] = useOutletContext()
  useEffect(()=>setTitle("Perfil"),[])
  return (
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="profile-layout d-flex gap-5 bg-wisteria py-2 px-5 rounded-2">
        <div class="d-flex flex-column align-items-center p-3">
          <img class="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
            <span class="fw-bold fs-4 my-4">Fulanita de Tal</span>
            <p class="fs-5">fulanita@gmail.com</p>
            <p class="fs-5">Santo Domingo</p>
            <p class="fs-5">809-485-2837</p>
        </div>
        <div class="d-flex flex-column align-items-center p-3">
          <img class="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
            <span class="fw-bold fs-4 my-4">Seguridad</span>
            <button class="w-100 shadow text-dark btn btn-thistle">Cambiar Contraseña</button>
            <button class="w-100 shadow text-dark btn btn-thistle mt-2">Editar Perfil</button>
            <button class="w-100 shadow text-dark btn btn-thistle mt-2">Cerrar Sesion</button>
        </div>
      </div>
    </div>
  )
}

export default Profile