import styles from '../Register/Register.styles';
import React, { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import ImagePicker from '../../components/layout/ImagePicker/ImagePicker';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { UseLoginContext } from '../../firebase/hooks/UseLogin';
import { UseLoadingContext } from '../../firebase/hooks/UseLoading';
import { getURL } from '../../firebase/context/StorageContext';
import { createChat } from '../../firebase/context/Database/ChatContext';
import { DEFAULT_PROVIDER, DEFAULT_USER_IMAGE } from '../../utils/constants';
import BackButton from '../../components/layout/BackButton/BackButton';
import { useUserContext } from '../../firebase/hooks/UseUser';

function Profile () {
  const navigate = useNavigate();
  const [user, setUser] = useState( [{}] );
  const [userInfo, setUserInfo] = useState();
  const [image, setImage] = useState( "" );
  const [edit, setEdit] = useState( false );
  const [setTitle] = useOutletContext();
  const { currUser, SignOut, getUser } = UseLoginContext();
  const { setLoading } = UseLoadingContext();
  const { profileUID } = useParams()
  const { UpdateUser } = useUserContext();

  const handleInput = ( event ) => {
    const { id, value } = event.target;
    setUserInfo( { ...user[0], [id]: value } );
    console.log( userInfo );
  };

  const handleLogOut = async () => {
    setLoading( true );
    SignOut()
      .then( () => setTimeout( () => {
        navigate( '/' );
        setLoading( false );
      }, 1500 ) );
  };

  useEffect( () => {
    setTitle( "Perfil" );
    const loadData = async () => {
      const userData = await getUser( currUser.uid );
      try {
        if ( !userData.providerImage ) {
          userData.imgUrl = userData.picture !== undefined && userData.picture !== "" ?
            await getURL( userData.picture ) : DEFAULT_USER_IMAGE;
        }
        else {
          userData.imgUrl = currUser.photoURL;
        }

        setImage( userData.imgUrl );
        const userArr = [userData];
        await setUser( userArr );
        await setUserInfo( userArr[0] );
      }
      catch ( Exception ) {
        console.log( Exception );
      }
    }
    setLoading( true );
    loadData();
    setLoading( false );
  }, [profileUID] )

  const handleEdit = () => {
    setEdit( true );
  }

  useEffect( () => {
    setLoading( false )
  }, [user] )

  const startChat = async () => {
    const chatId = await createChat( currUser.uid, user[0].uid )
    navigate( "/chat/" + chatId )
  }

  const handleSave = () => {
    const data = userInfo;
    data.URL = image;
    UpdateUser( currUser.uid, data );
  };

  return (
    <>
      {!edit ?
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
              {currUser.uid == user[0].uid ?
                <>
                  {
                    currUser.providerId !== undefined && currUser.providerId !== "" && currUser.providerId == DEFAULT_PROVIDER ?
                      <button className="w-100 shadow text-dark btn btn-thistle">Cambiar Contraseña</button> : <></>
                  }
                  <button className="w-100 shadow text-dark btn btn-thistle mt-2" onClick={handleEdit}>Editar Perfil</button>
                  <button className="w-100 shadow text-dark btn btn-thistle mt-2" onClick={handleLogOut} >Cerrar Sesion</button>
                </> : <button className="w-100 shadow text-dark btn btn-thistle" onClick={startChat}>Chatear</button>
              }
            </div>
          </div>
        </div> : // Editar Perfil
        <div className='h-100'>
          <div className="position-absolute top-50 start-50 translate-middle row">
            <div className="col rounded-start-3 p-5">
              <div className="d-flex justify-content-center align-items-center gap-3">
                <BackButton path={/profile/ + user[0].uid} />
                <h3 className="fw-bold">Editar Perfil</h3>
                <img className="img-fluid rounded-circle mb-2" width={50} src={require( "../../img/logo.png" )} alt="" />
              </div>
              <input className="form-control py-2 px-4 rounded mt-3" style={styles.loginInput} type="text" name="name" id="name" placeholder="Nombre" value={userInfo?.name} onChange={handleInput} />
              <input className="form-control py-2 px-4 rounded mt-3" style={styles.loginInput} type="text" name="lastname" id="lastname" placeholder="Apellido" value={userInfo?.lastname} onChange={handleInput} />

              <input className="form-control py-2 px-4 rounded mt-3" style={styles.loginInput} type="text" name="phone" id="phone" placeholder="Telefono" value={userInfo?.phone} onInput={handleInput} />

              <button className="btn btn-primary w-100 mt-4" onClick={handleSave} >Guardar</button>
            </div>

            <div className="col bg-indigo p-5 rounded-end-3">
              <ImagePicker controlId="inputImg" width="300" name="image" title="Selecciona una imagen" defaultImage={image} onImageSet={( image ) => setImage( image )} />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Profile