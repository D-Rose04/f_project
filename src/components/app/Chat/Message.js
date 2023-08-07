import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../../../firebase/context/LoginContext'
import { formatDate } from '../../../firebase/hooks/CommonHooks'
import { getURL } from '../../../firebase/context/StorageContext'

function Message({ message, lastMessage, img, onShowImage, onImageLoad }) {
    const authContext = useContext(loginContext)
    const { uid, text, seen, createdAt, image } = message

    const [mine, setMine] = useState(false)
    const [lastMine, setLastMine] = useState(false)

    useEffect(() => {
        setMine(uid == authContext.currUser.uid)
        setLastMine(uid == lastMessage.uid)
    }, [])

    return (
        <>
            {mine ? <>
                <div className={"message d-flex flex-row-reverse ps-2 " + (lastMine ? "mt-1" : "mt-2")}>
                    <div className='message-body bg-white rounded-2 ms-1 p-2'>
                        {image ? <div className='message-img-container pb-1'>
                            <img className='message-img img-fluid rounded-2' src={image} onLoad={onImageLoad} onClick={() => onShowImage(image)} />
                        </div> : null}
                        <div className="message-text ps-1 d-flex align-items-end flex-wrap justify-content-end">
                            <p className="m-0 text-dark">
                                {text}
                            </p>
                            <p className='m-0 ms-2 text-muted' style={{ fontSize: '12px' }}>
                                {formatDate(createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className={"message d-flex ps-2 " + (lastMine ? "mt-1" : "mt-2")}>
                    <div className="flex-shrink-0">
                        {lastMine ?
                            <div style={{ width: 35 + "px" }}></div> :
                            <img className="img-fluid rounded-circle object-fit-cover" width="35" style={{ width: '35px', height: '35px' }}
                                src={img} />}
                    </div>
                    <div className='message-body bg-indigo rounded-2 ms-1 p-2'>
                        {image ? <div className='message-img-container pb-1'>
                            <img className='message-img img-fluid rounded-2' src={image} onLoad={onImageLoad} onClick={() => onShowImage(image)} />
                        </div> : null}
                        <div className="message-text ps-2 d-flex align-items-end flex-wrap justify-content-end">
                            <p className="m-0">
                                {text}
                            </p>
                            <p className='m-0 ms-2' style={{ fontSize: '12px' }}>
                                {formatDate(createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </>}


        </>
    )
}

export default Message