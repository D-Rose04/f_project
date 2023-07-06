import React from 'react'
import styles from './ChatInput.styles.js'

function ChatInput() {
    return (
        <div className="d-flex bg-sblue rounded-2 p-2 position-fixed bottom-0 mb-2" style={styles.chatInputContainer}>
            <textarea className="form-control" rows="1" type="text" name="msg"
                id="txtMessage" placeholder="Escribe un mensaje" style={styles.chatInput}></textarea>
            <a className="align-self-center" href="#">
                <img className="img-fluid rounded-circle"
                    src="https://images.placeholders.dev/?width=35&height=35" alt="" />
            </a>
        </div>
    )
}

export default ChatInput