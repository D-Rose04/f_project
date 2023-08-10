import React, { useEffect, useState } from 'react'

function LostPetsSidebar({ petList, height, onFilter }) {
  const [filters, setFilters] = useState({})
  const [provinces, setProvinces] = useState([])
  const [municipalities, setMunicipalities] = useState([])

  function handleCheck(e) {
    const { id, name, checked } = e.target

    const filterArray = filters[name] ?? []

    if (checked) {
      filterArray.push(id)
    } else {
      const i = filterArray.indexOf(id)
      filterArray.splice(i, 1)
    }

    setFilters({ ...filters, [name]: filterArray })
  }

  useEffect(() => {
    const props = ['province', 'municipality']
    let filteredPets = petList

    props.forEach(prop => {
      if (filters[prop]) {
        filteredPets = filters[prop].length > 0 ? filteredPets.filter(pet => filters[prop].includes(pet[prop])) : filteredPets
      }
    })

    onFilter(filteredPets)
  }, [filters])

  useEffect(() => {
    let provincesData = []
    let munData = []

    petList.forEach(pet => {
      if (!provincesData.includes(pet.province)) {
        provincesData.push(pet.province)
      }

      if (!munData.includes(pet.municipality)) {
        munData.push(pet.municipality)
      }
    })
    setProvinces(provincesData)
    setMunicipalities(munData)
  }, [])

  return (
    <div className='overflow-y-scroll' style={{ height }}>
      <h4 className='fw-bold text-dark'>Filtros</h4>
      {provinces.length > 0 && <div class="filter-group d-flex flex-column">
        <h5>Provincias</h5>
        {provinces.map(prov => <div className="form-check">
          <input className="form-check-input" type="checkbox" id={prov} name='province' onChange={handleCheck} />
          <label className="form-check-label" htmlFor={prov}>{prov}</label>
        </div>)}
      </div>}

      {municipalities.length > 0 && <div class="filter-group d-flex flex-column">
        <h5>Municipios</h5>
        {municipalities.map(mun => <div className="form-check">
          <input className="form-check-input" type="checkbox" id={mun} name='municipality' onChange={handleCheck} />
          <label className="form-check-label" htmlFor={mun}>{mun}</label>
        </div>)}
      </div>}
    </div>
  )
}

export default LostPetsSidebar