import { Timestamp, addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../config/config-firebase";

const USERS_COLLECTION = 'users'
const CHATS_COLLECTION = 'chats'
const USER_CHATS_COLLECTION = 'userChats'

const userChatsRef = collection(db, USER_CHATS_COLLECTION);
const chatsRef = collection(db, CHATS_COLLECTION);

export async function addUser(uid, name, lastname, phone, picture) {
    const data = {
        uid,
        name,
        lastname,
        phone,
        picture,
        active: false,
        location: null,
        country: null,
        favoritePets: [],
        notifications: []
    }
    await addDoc(collection(db, USERS_COLLECTION), data)
}

export async function loadChats(uid, cb) {
    onSnapshot(doc(db, USER_CHATS_COLLECTION, uid), cb)
}

export async function loadMessages(chatId, callback) {
    // const messagesQuery=query(chatsRef, where("chatId", "==", uid))
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

    // console.log("response:",response)
}

async function updateUserChats(uid, chatId, message, time) {
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
        console.log("no existe")
        return
    }

    console.log("existe")

    const chatData = chatSnap.data()
    const hisUID = chatData.users[0] == uid ? chatData.users[1] : chatData.users[0]

    console.log(uid)
    console.log(hisUID)

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