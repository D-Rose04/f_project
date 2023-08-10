import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Logo from '../components/layout/Logo/Logo'
import NavigationLink from '../components/layout/NavigationLink/NavigationLink'
import NotificationButton from '../components/layout/NotificationButton/NotificationButton'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import ProfilePicture from '../components/layout/ProfilePicture/ProfilePicture'
import { UseLoadingContext } from '../firebase/hooks/UseLoading'
import { UseLoginContext } from '../firebase/hooks/UseLogin'
import { getUserByUID } from '../firebase/context/Database/UserContext'
import { getURL } from '../firebase/context/StorageContext'
import ChatNotification from '../components/layout/ChatNotification/ChatNotification'
import { Dropdown } from 'react-bootstrap'
import { DEFAULT_USER_IMAGE } from '../utils/constants'

function MainLayout() {
  const [title, setTitle] = useState("Titulo")
  const [sidebar, setSidebar] = useState()
  const [sidebarCols, setSidebarCols] = useState(2)
  const [sidebarWidth, setSidebarWidth] = useState()
  const [user, setUser] = useState([{}])

  const { loading, setLoading } = UseLoadingContext()
  const { currUser, getUser } = UseLoginContext()
  const location = useLocation()

  const layoutRowRef = useRef()
  const layoutContentRef = useRef()
  const sidebarRef = useRef(null)
  const sidebarContentRef = useRef(null)

  useEffect(() => {
    document.title = title + " - Happy Feets"
  }, [title])

  useEffect(() => {
    setLoading(true);
    const loadUser = async () => {
      const userData = await getUser(currUser.uid)
      try {
        if (!userData.providerImage) {
          userData.imgUrl = userData.imgUrl !== undefined && userData.imgUrl !== "" ? userData.imgUrl : DEFAULT_USER_IMAGE;
        }
        else {
          userData.imgUrl = currUser.photoURL;
        }

        const userArr = [userData];
        setUser(userArr);
      }
      catch (Exception) {
        console.log(Exception);
      }
    }
    loadUser();
    setLoading(false);
  }, [])

  useEffect(() => setSidebarWidth(sidebarRef.current.offsetWidth), [sidebarCols])

  useEffect(() => setSidebarWidth(sidebarRef.current.offsetWidth), [sidebarCols])

  useEffect(() => {
    const chatContainer = layoutRowRef.current;
    const path = location.pathname
    if (path.includes("/chat") || path.includes("/my-pets")) {
      sidebarContentRef.current.style.paddingLeft = "0"
      chatContainer.scrollTop = chatContainer.scrollHeight
      layoutContentRef.current.style.marginRight = "0"
    } else {
      sidebarContentRef.current.style.paddingLeft = sidebarContentRef.current.style.paddingRight;
      chatContainer.scrollTop = 0;
      layoutContentRef.current.style.marginRight = layoutContentRef.current.style.marginLeft
    }

    if (path.includes("/chat")) {
      layoutContentRef.current.style.backgroundColor = "var(--color-wisteria)"
    }

  }, [location])

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
            <NavigationLink href={"/help"} icon={"help"} className={"d-flex align-items-center"}>Ayuda</NavigationLink>
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
                {/* <NotificationButton href={'#'} count={16} image={'notification'} /> */}
                <ChatNotification href={'/chat'} image={'chat'} />
              </div>
            </div>
          </div>
          <div className="layout-row overflow-y-scroll row mt-1" ref={layoutRowRef}>
            <div className="layout-content col bg-thistle rounded my-2 ms-2" style={{ marginRight: "0.5em" }} ref={layoutContentRef}>
              <Outlet context={[setTitle, setSidebar, setSidebarCols, layoutRowRef /*This one only for the chat*/, sidebarContentRef, layoutContentRef]} />
            </div>
            <div className={"layout-sidebar col-" + (sidebarCols ?? "2")} ref={sidebarRef}>
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