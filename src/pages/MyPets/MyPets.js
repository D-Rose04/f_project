import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import './MyPets.css'
import PetCard from '../../components/app/PetCard/PetCard'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import MyPetsSidebar from '../../components/app/MyPets/MyPetsSidebar'
import { changePetStatus, getFavoritePetsIds, loadUserPets } from '../../firebase/context/Database/PetsContext'
import { IoIosMore } from 'react-icons/io'
import { Card, Dropdown } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa6'

function MyPets() {
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

    await changePetStatus(currUser.uid, petId)
  }

  async function loadPets() {
    setLoadingPets(true)
    const pets = await loadUserPets(currUser.uid)
    setPets(pets)
    setLoadingPets(false)
  }

  useEffect(() => {
    setTitle("Mis mascotas")
    setSidebar(<MyPetsSidebar />)
    setSidebarCols(2)

    loadPets()
  }, [])

  useEffect(() => {
    loadPets()
  }, [location])

  const EditButton = React.forwardRef(({ onClick }, ref) => (
    <IoIosMore
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ cursor: 'pointer' }}
    />
  ));

  return (
    <>
      {loadingPets ?
        <div className='row h-100 d-flex justify-content-center align-items-center'>
          <UseAnimations animation={loading} size={100} strokeColor='white' />
        </div> :
        <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
          <div className="col">
            <Card className='h-100'>
              <Card.Body className='p-2' style={{ height: '240px' }}>
                <Link className='d-block d-flex justify-content-center align-items-center bg-thistle rounded-1 h-100' to={"add-pet"}>
                  <FaPlus size={80} />
                </Link>
              </Card.Body>
            </Card>
          </div>
          {pets.map(p => <PetCard key={p.id} pet={p} isFavorite={false}>
            <Dropdown className='ms-3'>
              <Dropdown.Toggle className='text-dark' style={{ color: '#000', cursor: 'pointer' }} variant="success" id="dropdown-basic" as={EditButton} />
              <Dropdown.Menu>
                <Dropdown.Item className='text-dark' onClick={() => navigate("edit-pet/" + p.id)}>Editar</Dropdown.Item>
                <Dropdown.Item className='text-dark' onClick={() => {togglePet(p.id, p.uid); loadPets()}}>{p.deleted ? 'Restaurar' : 'Eliminar'}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </PetCard>)}
        </div>
      }
      <Outlet />
    </>
  )
}

export default MyPets