import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';
import { signOut } from 'firebase/auth';
import { getUserByUID } from '../../firebase/context/Database/UserContext';
import { getURL } from '../../firebase/context/StorageContext';
import { createChat } from '../../firebase/context/Database/ChatContext';

function Profile() {
  const [user, setUser] = useState([{}])
  const [, setTitle] = useOutletContext()
  const { currUser, SignOut } = UseLoginContext();
  const { setLoading } = UseLoadingContext();
  const navigate = useNavigate();
  // setLoading(true)

  const { profileUID } = useParams()

  const handleLogOut = async () => {
    setLoading(true);
    SignOut()
      .then(() => setTimeout(() => {
        navigate('/');
        setLoading(false);
      }, 1500));
  };

  useEffect(() => {
    setTitle("Perfil");
    const loadData = async () => {
      const userData = await getUserByUID(profileUID)
      userData.imgUrl = await getURL(userData.picture)
      const userArr = [userData]
      setUser(userArr)
    }

    loadData()
  }, [profileUID])

  useEffect(() => {
    setLoading(false)
  }, [user])

  const startChat = async () => {
    const chatId = await createChat(currUser.uid, user[0].uid)
    navigate("/chat/" + chatId)
  }

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="profile-layout d-flex gap-5 bg-wisteria py-2 px-5 rounded-2">
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle user-image object-fit-cover" style={{ width: '150px', height: '150px' }} src={user[0].imgUrl} referrerPolicy='no-referrer' alt="" />
          <span className="fw-bold fs-4 my-4">{user[0]?.name} {user[0]?.lastName}</span>
          <p className="fs-5">{user[0].email}</p>
          <p className="fs-5">{user[0].phone}</p>
        </div>
        <div className="d-flex flex-column align-items-center p-3">
          <img className="rounded-circle" src="https://images.placeholders.dev/?width=150&height=150" alt="" />
          <span className="fw-bold fs-4 my-4">Seguridad</span>
          {currUser.uid == user[0].uid ? <>
            <button className="w-100 shadow text-dark btn btn-thistle">Cambiar Contraseña</button>
            <button className="w-100 shadow text-dark btn btn-thistle mt-2">Editar Perfil</button>
            <button className="w-100 shadow text-dark btn btn-thistle mt-2" onClick={handleLogOut} >Cerrar Sesion</button>
          </> :
            <button className="w-100 shadow text-dark btn btn-thistle" onClick={startChat}>Chatear</button>}

        </div>
      </div>
    </div>

  )
}

export default Profile