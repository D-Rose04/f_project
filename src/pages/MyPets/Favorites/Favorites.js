import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import '../MyPets.css'
import PetCard from '../../../components/app/PetCard/PetCard'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import MyPetsSidebar from '../../../components/app/MyPets/MyPetsSidebar'
import { IoIosMore } from 'react-icons/io'
import { Dropdown } from 'react-bootstrap'
import { IconContext } from 'react-icons/lib'
import { getFavoritePets } from '../../../firebase/context/Database/PetsContext'

function Favorites() {
    const [favPets, setFavPets] = useState([])
    const [loadingPets, setLoadingPets] = useState(true)
    // const [favPetIds, setFavPetIds] = useState([])
  
    const [setTitle, setSidebar, setSidebarCols] = useOutletContext()
    const { currUser } = UseLoginContext()
    const navigate = useNavigate()
  
    useEffect(() => {
      setTitle("Favoritas")
      setSidebar(<MyPetsSidebar />)
      setSidebarCols(2)
  
      async function loadFavPets(){
        setFavPets(await getFavoritePets(currUser.uid))
        setLoadingPets(false)
      }
  
      loadFavPets()
    }, [])
  
    const MoreButton = React.forwardRef(({ onClick }, ref) => (
      <IconContext.Provider value={{ color: "black", className:'text-dark' }}>
        <div>
        <IoIosMore
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={{ cursor: 'pointer' }}
      />
      </div>
      </IconContext.Provider>
    ));
  
    return (
      <>
        {loadingPets ?
          <div className='row h-100 d-flex justify-content-center align-items-center'>
            <UseAnimations animation={loading} size={100} strokeColor='white' />
          </div> :
          (favPets.length > 0 ?
            <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
              {favPets.map(p => <PetCard key={p.id} pet={p} isFavorite={true}>
                <Dropdown className='ms-3'>
                  <Dropdown.Toggle className='text-dark' style={{ color: '#000', cursor: 'pointer' }} variant="success" id="dropdown-basic" as={MoreButton} />
                  <Dropdown.Menu>
                    <Dropdown.Item className='text-dark' onClick={() => navigate("/pets/" + p.id)}>Detalles</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </PetCard>)}
            </div> :
            <div className='row h-100 d-flex justify-content-center align-items-center'>
              <h4 className='text-white text-center'>No tienes animales agregados como favoritos</h4>
            </div>)}
        <Outlet />
      </>
    )
}

export default Favorites