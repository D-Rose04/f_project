import React, { useEffect, useState } from 'react'
import PostLink from './PostLink'
import { useNavigate } from 'react-router-dom'

function PostSidebar() {
    const navigate = useNavigate()
    return (
        <>
            {/* <Button variant='primary' onClick={() => navigate('/my-pets/add-pet')}>Agregar</Button> */}
            <PostLink onClick={() => navigate('social/add-post')}>Nuevo Post</PostLink>
        </>
    )
}

export default PostSidebar