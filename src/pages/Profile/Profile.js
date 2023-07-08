import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

function Profile() {
  const [setTitle,] = useOutletContext()
  useEffect(() => setTitle("Perfil"), [])
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="profile-layout d-flex gap-5 bg-wisteria py-2 px-5 rounded-2">
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
          <span className="fw-bold fs-4 my-4">Fulanita de Tal</span>
          <p className="fs-5">fulanita@gmail.com</p>
          <p className="fs-5">Santo Domingo</p>
          <p className="fs-5">809-485-2837</p>
        </div>
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
          <span className="fw-bold fs-4 my-4">Seguridad</span>
          <button className="w-100 shadow text-dark btn btn-thistle">Cambiar Contraseña</button>
          <button className="w-100 shadow text-dark btn btn-thistle mt-2">Editar Perfil</button>
          <button className="w-100 shadow text-dark btn btn-thistle mt-2">Cerrar Sesion</button>
        </div>
      </div>
    </div>
  )
}

export default Profile