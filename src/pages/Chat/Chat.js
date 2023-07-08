import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'

import './Chat.css';
import ChatInput from '../../components/app/Chat/ChatInput';

function Chat() {
    const [setTitle, setSidebar, chatRef] = useOutletContext()
    useEffect(() => {
        setTitle("Chat")
        const chatContainer = chatRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [])
    return (
        <div className="chat-layout row pb-5">
            <div className="message d-flex ps-2 mt-2">
                <div className="flex-shrink-0">
                    <img className="img-fluid rounded-circle" width="35"
                        src="https://images.placeholders.dev/?width=35&height=35" />
                </div>
                <div className="message-text flex-grow-1 bg-indigo rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex ps-2 mt-1">
                <div className="flex-shrink-0">
                    <div style={{ width: 35 + "px" }}></div>
                </div>
                <div className="message-text flex-grow-1 bg-indigo rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-2">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-1">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At quam quia cupiditate alias exercitationem excepturi voluptas. Molestias nam beatae reprehenderit illo et? Hic est quam eaque veniam amet at distinctio.
                    </p>
                </div>
            </div>
            <div className="message d-flex ps-2 mt-2">
                <div className="flex-shrink-0">
                    <img className="img-fluid rounded-circle" width="35"
                        src="https://images.placeholders.dev/?width=35&height=35" />
                </div>
                <div className="message-text flex-grow-1 bg-indigo rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-2">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-2">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex ps-2 mt-2">
                <div className="flex-shrink-0">
                    <img className="img-fluid rounded-circle" width="35"
                        src="https://images.placeholders.dev/?width=35&height=35" />
                </div>
                <div className="message-text flex-grow-1 bg-indigo rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex ps-2 mt-1">
                <div className="flex-shrink-0">
                    <div style={{ width: 35 + "px" }}></div>
                </div>
                <div className="message-text flex-grow-1 bg-indigo rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-2">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-1">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At quam quia cupiditate alias exercitationem excepturi voluptas. Molestias nam beatae reprehenderit illo et? Hic est quam eaque veniam amet at distinctio.
                    </p>
                </div>
            </div>
            <div className="message d-flex ps-2 mt-2">
                <div className="flex-shrink-0">
                    <img className="img-fluid rounded-circle" width="35"
                        src="https://images.placeholders.dev/?width=35&height=35" />
                </div>
                <div className="message-text flex-grow-1 bg-indigo rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-2">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="message d-flex flex-row-reverse ps-2 mt-2">
                <div className="message-text flex-grow-1 bg-white rounded-4 ms-1 p-2 ps-3">
                    <p className="m-0 text-dark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <ChatInput />
        </div>
    )
}

export default Chat