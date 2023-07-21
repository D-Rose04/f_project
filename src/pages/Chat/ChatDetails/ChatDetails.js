import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

import '../Chat.css';
import ChatSidebar from '../../../components/app/Chat/ChatSidebar';
import ChatInput from '../../../components/app/Chat/ChatInput';
import { checkChatById, checkChatOwner, loadMessages, loadUserChat } from '../../../firebase/context/Database/ChatContext';
import Message from '../../../components/app/Chat/Message';
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import { getURL } from '../../../firebase/context/StorageContext';
import { Modal } from 'react-bootstrap';

function ChatDetails() {
    const [setTitle, setSidebar, setSidebarCols, layoutRowRef, , layoutContentRef] = useOutletContext()
    const { chatId } = useParams()
    const navigate = useNavigate();

    const [messages, setMessages] = useState([])
    const [contactImg, setContactImg] = useState()
    const { currUser } = UseLoginContext()
    // const [firstTime, setFirstTime] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [modalImgUrl, setModalImgUrl] = useState("")

    const lowerScroll = () => {
        const chatContainer = layoutRowRef.current;
        // const isScrolledToBottom = chatContainer.scrollHeight - chatContainer.clientHeight <= chatContainer.scrollTop + 1;

        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    useEffect(() => {
        setTitle("Chat")
        setSidebarCols("3")

        const checkChat = async () => {
            if ((await checkChatById(chatId))
                && (await checkChatOwner(chatId, currUser.uid))) {
                loadChatPage()
            } else {
                navigate("/chat")
            }
        }

        const loadChatPage = () => {
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
        }

        checkChat()
    }, [chatId])

    useEffect(() => {
        lowerScroll()
    }, [messages]);

    const showImageModal = async (imgBucket) => {
        setShowModal(true)
        const url = await getURL(imgBucket)
        setModalImgUrl(url)
    }

    const handleHideModal = () => {
        setShowModal(false)

    }

    return (
        <div className="chat-layout row pb-5">
            {messages.map((m, i) => <Message key={i} img={contactImg} message={m} lastMessage={messages[i - 1] ?? { uid: 'qwertyuiop' }} onShowImage={showImageModal} onImageLoad={lowerScroll} />)}

            <ChatInput layoutContentRef={layoutContentRef} />

            <Modal size='xl' show={showModal} onHide={handleHideModal} dialogClassName="modal-100w"
                aria-labelledby="example-custom-modal-styling-title">
                {/* <Modal.Header className='bg-indigo' closeButton>
                    <Modal.Title className='text-white'>
                        Imagen
                    </Modal.Title>
                </Modal.Header> */}
                <Modal.Body className='d-flex justify-content-center bg-indigo px-5' closeButton>
                    <img className='img-fluid' src={modalImgUrl} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ChatDetails