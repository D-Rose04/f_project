import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'

import './Chat.css';
import ChatInput from '../../components/app/Chat/ChatInput';
import ChatSidebar from '../../components/app/Chat/ChatSidebar';
import ChatDetails from './ChatDetails/ChatDetails';
import Logo from '../../components/layout/Logo/Logo';
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';

function Chat() {
    const [setTitle, setSidebar, setSidebarCols, layoutRowRef, , layoutContentRef] = useOutletContext()

    useEffect(() => {
        setTitle("Chat")
        setSidebarCols("3")
        setSidebar(<ChatSidebar height={layoutRowRef.current.offsetHeight * 0.80} />)
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <Logo />
        </div>
    )
}

export default Chat