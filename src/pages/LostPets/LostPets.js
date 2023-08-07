import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import PetCard from '../../components/app/PetCard/PetCard'
import { Button, Dropdown } from 'react-bootstrap'
import { getLostPets } from '../../firebase/context/Database/PetsContext'
import LostPetCard from '../../components/app/PetCard/LostPetCard'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { IoIosMore } from 'react-icons/io'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'

function LostPets() {
  const [lostPets, setLostPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)

  const navigate = useNavigate()
  const [setTitle, setSidebar, setSidebarCols] = useOutletContext()
  const { currUser } = UseLoginContext()

  // const handleShow = () => navigate('add-pet')

  useEffect(() => {
    setTitle("Mascotas perdidas")
    setSidebarCols(2)
    setSidebar(<></>)

    async function loadPets() {
      const petsData = await getLostPets(currUser.uid)
      setLostPets(petsData)
      setLoadingPets(false)
    }

    loadPets()
  }, [])

  const MoreButton = React.forwardRef(({ onClick }, ref) => (
    <img
      className="img-fluid rounded-circle"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      width={15}
      src={require('../../img/icons/more.png')}
      style={{ cursor: 'pointer' }}
    />
  ));

  return (loadingPets ?
    <div className='row h-100 d-flex justify-content-center align-items-center'>
      <UseAnimations animation={loading} size={100} strokeColor='white' />
    </div> :
    lostPets.length > 0 ?
      <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
        {lostPets.map(p => <LostPetCard key={p.id} pet={p}>
          <Dropdown className='ms-3'>
            <Dropdown.Toggle variant="success" id="dropdown-basic" as={MoreButton} />
            <Dropdown.Menu>
              <Dropdown.Item className='text-dark' onClick={() => navigate("" + p.id)}>Detalles</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </LostPetCard>)}
        <Outlet />
      </div> :
      <div className='row h-100 d-flex justify-content-center align-items-center'>
        <h4 className='text-white text-center'>No se encontraron animales</h4>
      </div>
  )
}

export default LostPets