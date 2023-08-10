import React, { useEffect, useState } from 'react'
import styles from './ChatSidebar.styles'
import { formatDate, formatDateFromSecs } from '../../../firebase/hooks/CommonHooks'
import { Link, useParams } from 'react-router-dom'
import { getURL } from '../../../firebase/context/StorageContext'
import { AiFillMessage } from 'react-icons/ai'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'

function ChatContact({ chat }) {
    const { id, picture, name, lastName, lastMessage, sentAt, uidSent, seen } = chat
    const { currUser } = UseLoginContext()

    const [hover, setHover] = useState(false)
    const [open, setOpen] = useState(false)
    const { chatId } = useParams()

    useEffect(() => {
        setOpen(id == chatId)
    }, [chatId])

    const contactClass = open ? " rounded-start-0 rounded-end-5" : " rounded-5"
    const contactStyle = {
        backgroundColor: open ? "var(--color-wisteria)" : hover ? "var(--color-sblue)" : "var(--color-indigo)"
    }


    return (
        <Link className='text-decoration-none' to={open ? "/chat" : ("/chat/" + id)}>
            <div className={'bg-indigo d-flex justify-content-between align-items-center p-1 mb-1' + contactClass} style={contactStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <img className={'img-fluid rounded-circle object-fit-cover flex-shrink-0'} width={40} height={40} style={styles.contactImg} src={picture} />
                <div className='flex-grow-1 ms-2 d-flex flex-column' style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <span className={'text-decoration-none fw-bold'} style={{ fontSize: '16px' }}>{name} {lastName}</span>
                    <span className={'text-decoration-none text-nowrap'} style={{ fontSize: '14px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{lastMessage}</span>
                </div>
                <span className={'flex-shrink-0'} style={styles.contactDate}>{formatDate(sentAt)}</span>
                {!seen && uidSent != currUser.uid ? <AiFillMessage className='ms-1' /> : null}
            </div>
        </Link>
    )
}

export default ChatContact