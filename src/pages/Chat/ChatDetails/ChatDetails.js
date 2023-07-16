import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

import '../Chat.css';
import ChatSidebar from '../../../components/app/Chat/ChatSidebar';
import ChatInput from '../../../components/app/Chat/ChatInput';
import { loadMessages } from '../../../firebase/context/DatabaseContext';
import Message from '../../../components/app/Chat/Message';

function ChatDetails() {
    const [setTitle, setSidebar, setSidebarCols, layoutRowRef, , layoutContentRef] = useOutletContext()
    const { chatId } = useParams()

    const [messages, setMessages] = useState([])
    // const [firstTime, setFirstTime] = useState(false)

    useEffect(() => {
        setTitle("Chat")
        setSidebarCols("3")
        setSidebar(<ChatSidebar height={layoutRowRef.current.offsetHeight * 0.80} />)

        loadMessages(chatId, (doc) => {
            const messagesData = doc.data().messages
            setMessages(messagesData)
        })
        console.log(layoutRowRef)
    }, [])

    useEffect(() => {
        const chatContainer = layoutRowRef.current;
        // const isScrolledToBottom = chatContainer.scrollHeight - chatContainer.clientHeight <= chatContainer.scrollTop + 1;

        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-layout row pb-5">
            {messages.map((m, i) => <Message key={i} message={m} lastMessage={messages[i - 1] ?? { uid: 'qwertyuiop' }} />)}

            <ChatInput layoutContentRef={layoutContentRef} />
        </div>
    )
}

export default ChatDetails