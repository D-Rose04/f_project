import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function MyPetsLink({ children, to }) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)

  const location = useLocation()

  const contactClass = open ? " rounded-start-0 rounded-end-5" : " ms-1 rounded-5"
  const contactStyle = {
    backgroundColor: open ? "var(--color-thistle)" : hover ? "var(--color-thistle-l)" : "var(--color-thistle-d)"
  }

  useEffect(() => {
    setOpen(location.pathname == to)
  }, [location])

  return (
    <Link className='text-decoration-none' to={to}>
      <div className={'bg-indigo d-flex justify-content-start align-items-center p-1 mb-1' + contactClass} style={contactStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <span className={'flex-grow-1 ms-2 text-decoration-none'}>{children}</span>
      </div>
    </Link>
  )
}

export default MyPetsLink