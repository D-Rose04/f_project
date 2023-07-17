import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './ChatInput.styles.js'
import { IoMdSend } from 'react-icons/io'
import { sendMessage } from '../../../firebase/context/Database/ChatContext.js'
import { loginContext } from '../../../firebase/context/LoginContext.js'
import { useParams } from 'react-router-dom'

function ChatInput({ layoutContentRef }) {
    const [inputWidth, setInputWidth] = useState(100)
    const [message, setMessage] = useState("")

    const chatInputRef = useRef(null)
    const formRef = useRef(null)
    const inputRef = useRef(null)

    const { chatId } = useParams()
    const authContext = useContext(loginContext)

    useEffect(() => {
        setInputWidth(layoutContentRef.current.offsetWidth)
    }, [inputWidth, layoutContentRef.current?.offsetWidth])

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensaje();
        }
    }

    const enviarMensaje = () => {
        // Aquí puedes hacer algo con el mensaje, como enviarlo al servidor
        sendMessage(authContext.currUser.uid, message, chatId)
        setMessage("")
    };

    return (
        <div className="d-flex bg-sblue rounded-2 p-2 position-fixed bottom-0 mb-3" ref={chatInputRef} style={{ width: inputWidth }}>
            <textarea
                className="form-control"
                ref={inputRef}
                rows="1"
                type="text"
                name="msg"
                id="txtMessage"
                placeholder="Escribe un mensaje"
                style={styles.chatInput}
                onChange={e => setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKey}></textarea>

            <a className="align-self-center fs-5" href="#" onClick={() => { formRef.current.submit() }}>
                {/* <img className="img-fluid rounded-circle"
                    src="https://images.placeholders.dev/?width=35&height=35" alt="" /> */}
                <IoMdSend />
            </a>

        </div>

    )
}

export default ChatInput