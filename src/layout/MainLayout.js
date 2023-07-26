import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Logo from '../components/layout/Logo/Logo'
import NavigationLink from '../components/layout/NavigationLink/NavigationLink'
import NotificationButton from '../components/layout/NotificationButton/NotificationButton'
import { Outlet, useParams } from 'react-router-dom'
import ProfilePicture from '../components/layout/ProfilePicture/ProfilePicture'
import { UseLoadingContext } from '../firebase/hooks/UseLoading'
import { UseLoginContext } from '../firebase/hooks/UseLogin'
import { getUserByUID } from '../firebase/context/Database/UserContext'
import { getURL } from '../firebase/context/StorageContext'
import { DEFAULT_USER_IMAGE } from '../utils/constants'

function MainLayout () {
  const [title, setTitle] = useState( "Titulo" )
  const [sidebar, setSidebar] = useState()
  const [sidebarCols, setSidebarCols] = useState( 2 )
  const [sidebarWidth, setSidebarWidth] = useState()
  const [user, setUser] = useState( [{}] )

  const { setLoading } = UseLoadingContext()
  const { currUser, getUser } = UseLoginContext()

  const layoutRowRef = useRef()
  const layoutContentRef = useRef()
  const sidebarRef = useRef( null )
  const sidebarContentRef = useRef( null )

  useEffect( () => {
    setLoading(true);
    const loadUser = async () => {
      const userData = await getUser( currUser.uid )
      try {
        if (!userData.providerImage ) {
          userData.imgUrl = userData.picture !== undefined && userData.picture !== "" ?
            await getURL( userData.picture ) : DEFAULT_USER_IMAGE;
        }
        else {
          userData.imgUrl = currUser.photoURL;
        }

        const userArr = [userData];
        setUser( userArr );
      }
      catch ( Exception ) {
        console.log( Exception );
      }
    }
    loadUser();
    setLoading(false);
  }, [] )

  useEffect( () => setSidebarWidth( sidebarRef.current.offsetWidth ), [sidebarCols] )

  useEffect( () => {
    sidebarContentRef.current.style.paddingLeft = title == "Chat" ? "0" : sidebarContentRef.current.style.paddingRight;

    const chatContainer = layoutRowRef.current;
    chatContainer.scrollTop = title == "Chat" ? chatContainer.scrollHeight : 0;

    layoutContentRef.current.style.marginRight = title == "Chat" ? "0" : layoutContentRef.current.style.marginLeft
    layoutContentRef.current.style.backgroundColor = title == "Chat" ? "var(--color-wisteria)" : "var(--color-thistle)"
  }, [title] )

  const algo = () => {
    console.log( "bottom:", layoutRowRef.current.scrollBottom )
    console.log( "height:", layoutRowRef.current.scrollHeight )
  }

  return (
    <div className="container-fluid h-100 bg-indigo">
      <div className="row h-100">
        <div className="col-4 col-sm-3 col-lg-2 d-flex flex-column align-items-center p-2 side-bar">

          <Logo />

          <div className="navigation-links mt-3 d-flex flex-column flex-grow-1 gap-3 mt-5 ms-xl-3">
            <NavigationLink href={"/"} icon={"adopted"} className={"d-flex align-items-center"}>Adoptar</NavigationLink>
            <NavigationLink href={"/lost-pets"} icon={"lost"} className={"d-flex align-items-center"}>Mascotas Perdidas</NavigationLink>
            <NavigationLink href={"/my-pets"} icon={"my-pets"} className={"d-flex align-items-center"}>Mis Mascotas</NavigationLink>
            <NavigationLink href={"/social "} icon={"social"} className={"d-flex align-items-center"}>Social</NavigationLink>
            <NavigationLink href={"/"} icon={"help"} className={"d-flex align-items-center"}>Ayuda</NavigationLink>
            <NavigationLink href={"/"} icon={"settings"} className={"d-flex align-items-center mt-auto mb-2"}>Configuracion</NavigationLink>
          </div>

        </div>
        <div className="main-layout col m-1 rounded bg-white text-dark">
          <div className="layout-header d-flex justify-content-between mt-2 w-100">

            <div className="flex-grow-1 d-flex align-items-center">
              <span className="page-title">{title}</span>
            </div>
            <div className="">
              <div className="d-flex flex-row-reverse justify-content-between align-items-center">
                <ProfilePicture pictureImg={user[0].imgUrl} profileUrl={"/profile/" + user[0].uid} />
                <NotificationButton href={'#'} count={16} image={'notification'} />
                <NotificationButton href={'/chat'} count={9} image={'chat'} />
              </div>
            </div>
          </div>
          <div className="layout-row overflow-y-scroll row mt-1" ref={layoutRowRef} onScroll={algo}>
            <div className="layout-content col bg-thistle rounded my-2 ms-2" style={{ marginRight: "0.5em" }} ref={layoutContentRef}>
              <Outlet context={[setTitle, setSidebar, setSidebarCols, layoutRowRef /*This one only for the chat*/, sidebarContentRef, layoutContentRef]} />
            </div>
            <div className={"layout-sidebar col-" + ( sidebarCols ?? "2" )} ref={sidebarRef}>
              <div className="row mt-3" >
                <div className="sidebar-content col position-fixed" ref={sidebarContentRef} style={{ width: `${sidebarWidth}px` }}>
                  {/* Aqui va un state que contendra un componente que va en el sidebar derecho */}
                  {sidebar}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default MainLayout