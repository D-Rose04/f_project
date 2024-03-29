import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './Adopt.css'
import PetCard from '../../components/app/PetCard/PetCard'
import Example from '../../components/app/PetCard/Example'
import { UseLoginContext } from '../../firebase/hooks/UseLogin'
import { getFavoritePetsIds, getPets } from '../../firebase/context/Database/PetsContext'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import { IconContext } from 'react-icons'
import { IoIosMore } from 'react-icons/io'
import { Dropdown } from 'react-bootstrap'
import { UseLoadingContext } from '../../firebase/hooks/UseLoading'
import AdoptSidebar from '../../components/app/Adopt/AdoptSidebar'

function Adopt() {
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)
  const [favPetIds, setFavPetIds] = useState([])

  const [setTitle, setSidebar, setSidebarCols, layoutRowRef] = useOutletContext()
  const { currUser } = UseLoginContext()
  const navigate = useNavigate()

  useEffect(() => {
    setTitle("Adoptar")
    setSidebarCols(2)

    const loadPets = async () => {
      const petsData = await getPets(currUser.uid)
      const favIds = await getFavoritePetsIds(currUser.uid)
      setFavPetIds(favIds)
      setPets(petsData)
      setLoadingPets(false)
      setSidebar(<AdoptSidebar petList={petsData} height={layoutRowRef.current.offsetHeight * 0.80} onFilter={setPets} />)
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
    pets.length > 0 ?
      <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-2 py-1">
        {pets.map(p => <PetCard key={p.id} pet={p} isFavorite={favPetIds.includes(p.id)}>
          <Dropdown className='ms-3'>
            <Dropdown.Toggle className='text-dark' style={{ color: '#000', cursor: 'pointer' }} variant="success" id="dropdown-basic" as={MoreButton} />
            <Dropdown.Menu>
              <Dropdown.Item className='text-dark' onClick={() => navigate("" + p.id)}>Detalles</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </PetCard>)}
      </div> :
      <div className='row h-100 d-flex justify-content-center align-items-center'>
        <h4 className='text-white text-center'>No se encontraron animales</h4>
      </div>
  )
}

export default Adopt