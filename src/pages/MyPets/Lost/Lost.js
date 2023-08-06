import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import '../MyPets.css'
import PetCard from '../../../components/app/PetCard/PetCard'
import { UseLoginContext } from '../../../firebase/hooks/UseLogin'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import MyPetsSidebar from '../../../components/app/MyPets/MyPetsSidebar'
import { changeLostPetStatus, getLostUserPets } from '../../../firebase/context/Database/PetsContext'
import { IoIosMore } from 'react-icons/io'
import { Card, Dropdown } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa6'
import LostPetCard from '../../../components/app/PetCard/LostPetCard'

function Lost() {
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)

  const [setTitle, setSidebar, setSidebarCols] = useOutletContext()
  const { currUser } = UseLoginContext()
  const navigate = useNavigate()
  const location = useLocation()

  async function togglePet(petId, uid) {
    if (uid !== currUser.uid) {
      return
    }

    await changeLostPetStatus(currUser.uid, petId)
  }

  async function loadPets() {
    setLoadingPets(true)
    const pets = await getLostUserPets(currUser.uid)
    setPets(pets)
    setLoadingPets(false)
  }

  useEffect(() => {
    setTitle("Mis mascotas perdidas")
    setSidebar(<MyPetsSidebar />)
    setSidebarCols(2)

    loadPets()
  }, [])

  useEffect(() => {
    loadPets()
  }, [location])

  const EditButton = React.forwardRef(({ onClick }, ref) => (
    <img
      className="img-fluid rounded-circle"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      width={15}
      src={require('../../../img/icons/more.png')}
      style={{ cursor: 'pointer' }}
    />
  ));

  return (
    <>
      {loadingPets ?
        <div className='row h-100 d-flex justify-content-center align-items-center'>
          <UseAnimations animation={loading} size={100} strokeColor='white' />
        </div> :
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-2 py-1">
          <div className="col">
            <Card className='h-100'>
              <Card.Body className='p-2' style={{ height: '240px' }}>
                <Link className='d-block d-flex justify-content-center align-items-center bg-thistle rounded-1 h-100' to={"add-pet"}>
                  <FaPlus size={80} />
                </Link>
              </Card.Body>
            </Card>
          </div>
          {pets.map(p => <LostPetCard key={p.id} pet={p} isFavorite={false}>
            <Dropdown className='ms-3'>
              <Dropdown.Toggle className='text-dark' style={{ color: '#000', cursor: 'pointer' }} variant="success" id="dropdown-basic" as={EditButton} />
              <Dropdown.Menu>
                <Dropdown.Item className='text-dark' onClick={() => navigate("edit/" + p.id)}>Editar</Dropdown.Item>
                <Dropdown.Item className='text-dark' onClick={() => { togglePet(p.id, p.uid); loadPets() }}>{p.deleted ? 'Restaurar' : 'Eliminar'}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </LostPetCard>)}
        </div>
      }
      <Outlet />
    </>
  )
}

export default Lost