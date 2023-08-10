import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function NotFound () {

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle row">
        <div className="col bg-indigo p-5 rounded-3">
          <h3 className="fw-bold text-white mt-2 text-center">404 - Pagina no encontrada</h3>
          <Link to='/' className='btn btn-primary w-100 mt-4'>Volver</Link>
        </div>
      </div>
    </>
  )
}

export default NotFound