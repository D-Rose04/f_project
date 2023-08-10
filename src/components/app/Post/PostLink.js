import React, { useState } from 'react'

function PostLink({ children, onClick }) {
  const [hover, setHover] = useState(false)

  const contactStyle = {
    backgroundColor: hover ? "var(--color-thistle-l)" : "var(--color-thistle-d)",
    cursor: 'pointer'
  }

  return (
    <div className={'bg-indigo d-flex justify-content-start align-items-center p-1 mb-1 ms-1 rounded-5'} onClick={onClick} style={contactStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span className={'flex-grow-1 ms-2 text-decoration-none'}>{children}</span>
    </div>
  )
}

export default PostLink