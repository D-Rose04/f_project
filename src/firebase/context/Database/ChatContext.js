import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/config-firebase";

const CHATS_COLLECTION = 'chats'
const USER_CHATS_COLLECTION = 'userChats'

export async function loadChats(uid, cb) {
    onSnapshot(doc(db, USER_CHATS_COLLECTION, uid), cb)
}

export async function loadMessages(chatId, callback) {
    onSnapshot(doc(db, CHATS_COLLECTION, chatId), callback)
}

export async function sendMessage(uid, text, chatId) {
    // const messagesQuery = query(collection(db, CHATS_COLLECTION), chatId);
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    const time = Timestamp.now()
    const data = {
        uid,
        text,
        createdAt: time,
        seen: false
    }

    await updateDoc(chatRef, {
        messages: arrayUnion(data)
    })

    await updateUserChats(uid, chatId, text, time)
}

//este solo para usarlo internamente
async function updateUserChats(uid, chatId, message, time) {
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
        return
    }

    const chatData = chatSnap.data()
    const hisUID = chatData.users[0] == uid ? chatData.users[1] : chatData.users[0]

    const myChatRef = doc(db, USER_CHATS_COLLECTION, uid)
    const hisChatRef = doc(db, USER_CHATS_COLLECTION, hisUID)

    //update my userChat
    await updateDoc(myChatRef, {
        [chatId + ".lastMessage"]: message,
        [chatId + ".sentAt"]: time,
        [chatId + ".uidSent"]: uid
    });

    //update his userChat
    await updateDoc(hisChatRef, {
        [chatId + ".lastMessage"]: message,
        [chatId + ".sentAt"]: time,
        [chatId + ".uidSent"]: uid
    });
}