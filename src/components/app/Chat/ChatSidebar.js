import React, { useContext, useEffect, useState } from 'react'
import ChatContact from './ChatContact'
import { loadChats } from '../../../firebase/context/DatabaseContext'
import { loginContext } from '../../../firebase/context/LoginContext'
import { UseLoadingContext } from '../../../firebase/hooks/UseLoading'

function ChatSidebar({ height }) {

  const authData = useContext(loginContext)

  const [chats, setChats] = useState([])

  useEffect(() => {
    const compareChatDates = (a, b) => {
      if (a.sentAt < b.sentAt)
        return -1

      if (a.sentAt > b.sentAt)
        return 1

      if (a.sentAt == b.sentAt)
        return 0
    }

    loadChats(authData.currUser.uid, doc => {
      const chatsData = doc.data();
      const chatIDs = chatsData.chatIDs
      let userChats = [];

      chatIDs.forEach(chatId => {
        chatsData[chatId].id = chatId
        userChats.push(chatsData[chatId])
      });

      userChats.sort(compareChatDates)
      setChats(userChats)
    })
  }, [])

  return (
    <>
      <div className="d-flex bg-sblue rounded-top-2 p-1 ">
        <input className="form-control comment-input" type="text" name="contact"
          id="txtContact" placeholder="Buscar contacto" />
      </div>
      <div className='bg-thistle py-2 rounded-end-2 pe-2 overflow-y-scroll' style={{ height }}>
        {chats.map(chat => <ChatContact chat={chat} key={chat.id} />)}
      </div>
    </>
  )
}

export default ChatSidebar