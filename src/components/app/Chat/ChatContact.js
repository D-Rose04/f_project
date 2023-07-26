import React, { useEffect, useState } from 'react'
import styles from './ChatSidebar.styles'
import { formatDate, formatDateFromSecs } from '../../../firebase/hooks/CommonHooks'
import { Link, useParams } from 'react-router-dom'
import { getURL } from '../../../firebase/context/StorageContext'

function ChatContact({ chat }) {
    const { id, picture, name, lastName, lastMessage, sentAt, uidSent, seen } = chat

    const [hover, setHover] = useState(false)
    const [open, setOpen] = useState(false)
    const [imgUrl, setImgUrl] = useState("")
    // const [contactClass, setContactClass] = useState("rounded-5")
    // const [contactStyle, setContactStyle] = useState({})
    const { chatId } = useParams()

    useEffect(()=>{
        getURL(picture).then((url)=>{
            setImgUrl(url)
        })
    },[])

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
                <img className={'img-fluid rounded-circle object-fit-cover'} width={35} height={35} style={styles.contactImg} src={imgUrl} />
                <span className={'flex-grow-1 ms-2 text-decoration-none'}>{name} {lastName}</span>
                <span className={''} style={styles.contactDate}>{formatDate(sentAt)}</span>
            </div>
        </Link>
    )
}

export default ChatContact