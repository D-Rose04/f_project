import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

import '../Chat.css';
import ChatSidebar from '../../../components/app/Chat/ChatSidebar';
import ChatInput from '../../../components/app/Chat/ChatInput';
import { loadMessages, loadUserChat } from '../../../firebase/context/Database/ChatContext';
import Message from '../../../components/app/Chat/Message';
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { getURL } from '../../../firebase/context/StorageContext';

function ChatDetails() {
    const [setTitle, setSidebar, setSidebarCols, layoutRowRef, , layoutContentRef] = useOutletContext()
    const { chatId } = useParams()

    const [messages, setMessages] = useState([])
    const [contactImg, setContactImg] = useState()
    const { currUser } = UseLoginContext()
    // const [firstTime, setFirstTime] = useState(false)

    useEffect(() => {
        setTitle("Chat")
        setSidebarCols("3")
        setSidebar(<ChatSidebar height={layoutRowRef.current.offsetHeight * 0.80} />)

        loadMessages(chatId, (doc) => {
            const messagesData = doc.data().messages
            setMessages(messagesData)
        })

        const loadImg = async () => {
            const userChatData = await loadUserChat(currUser.uid)
            const contactImg = userChatData[chatId].picture
            setContactImg(await getURL(contactImg))
        }

        loadImg()
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
            {messages.map((m, i) => <Message key={i} img={contactImg} message={m} lastMessage={messages[i - 1] ?? { uid: 'qwertyuiop' }} />)}

            <ChatInput layoutContentRef={layoutContentRef} />
        </div>
    )
}

export default ChatDetails