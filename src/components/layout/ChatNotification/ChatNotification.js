import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { loadChats } from '../../../firebase/context/Database/ChatContext';
import { UseLoginContext } from '../../../firebase/hooks/UseLogin';
import notifSound from '../../../sounds/msg_notif.mp3'
import useSound from 'use-sound';


function ChatNotification ( { image, count, href } ) {
    const [chats, setChats] = useState( null )
    const [notSeen, setNotSeen] = useState( 0 )

    const img = require( './../../../img/icons/' + image + '.png' );
    const { currUser } = UseLoginContext()

    const [play, { stop }] = useSound( notifSound )

    useEffect( () => {
        const cargarChats = async () => {
            await loadChats( currUser.uid, ( snapshot ) => {
                try {
                    const snapshotData = snapshot.data()
                    const chatList = snapshotData.chatIDs
                    let chatCount = 0

                    chatList.forEach( c => {
                        if ( snapshotData[c].uidSent != currUser.uid && !snapshotData[c].seen ) {
                            play()

                            setTimeout( () => {
                                stop()
                            }, 1000 );
                        }

                        if ( snapshotData[c].uidSent != currUser.uid && !snapshotData[c].seen ) {
                            chatCount++
                        }
                        setNotSeen( chatCount )
                    } );
                }
                catch ( Exception ) {

                }
            } )
        }

        cargarChats()
    }, [] )

    // useEffect(() => {
    //     const chatList = chats?.chatIDs
    //     let chatCount = 0

    //     if (chatList == null) return;

    //     chatList.forEach(c => {
    //         if (chats[c].uidSent != currUser.uid && !chats[c].seen) {
    //             play()

    //             setTimeout(() => {
    //                 stop()
    //             }, 1000);
    //         }

    //         if (chats[c].uidSent != currUser.uid && !chats[c].seen) {
    //             chatCount++
    //         }
    //         setNotSeen(chatCount)
    //     });

    // }, [chats])

    return (
        <Link className="position-relative ms-3" to={href} >
            <img width="25" className="rounded-circle img-fluid"
                src={img} alt="" />
            {notSeen ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-thistle">{notSeen}</span> : null}
        </Link>
    )
}

export default ChatNotification