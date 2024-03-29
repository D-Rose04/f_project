import React, { useContext, useEffect, useState } from 'react'
import ChatContact from './ChatContact'
import { loadChats } from '../../../firebase/context/Database/ChatContext'
import { loginContext } from '../../../firebase/context/LoginContext'
import { UseLoadingContext } from '../../../firebase/hooks/UseLoading'

function ChatSidebar({ height }) {

  const authData = useContext(loginContext)

  const [chats, setChats] = useState([])
  const [originalChats, setOriginalChats] = useState([])
  const [contact, setContact] = useState()

  useEffect(() => {
    console.log(contact)
    if (contact) {
      let chatsData = chats
      chatsData = chatsData.filter(c => c.name.toLowerCase().includes(contact.toLowerCase()) ||
        c.lastName.toLowerCase().includes(contact.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(contact.toLowerCase()))
      console.log(chatsData)
      setChats(chatsData)
    }else{
      setChats(originalChats)
    }
  }, [contact])

  useEffect(() => {
    const compareChatDates = (a, b) => {
      console.log(a)
      console.log(b)

      if (a.sentAt < b.sentAt) {
        console.log("a < b")
        return 1
      }

      if (a.sentAt > b.sentAt) {
        console.log("a > b")
        return -1
      }

      if (a.sentAt == b.sentAt) {
        console.log("a == b")
        return 0
      }
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
      setOriginalChats(userChats)
    })
  }, [])

  return (
    <>
      <div className="d-flex bg-sblue rounded-top-2 p-1 ">
        <input className="form-control comment-input" type="text" name="contact"
          id="txtContact" placeholder="Buscar contacto" onChange={(e) => setContact(e.target.value)} />
      </div>
      <div className='bg-thistle py-2 rounded-end-2 pe-2 overflow-y-scroll' style={{ height }}>
        {chats.map(chat => <ChatContact chat={chat} key={chat.id} />)}
      </div>
    </>
  )
}

export default ChatSidebar