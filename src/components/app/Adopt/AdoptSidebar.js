import React, { useEffect, useState } from 'react'

function AdoptSidebar({ petList, height, onFilter }) {
  const [filters, setFilters] = useState({})
  const [species, setSpecies] = useState([])
  const [races, setRaces] = useState([])
  const [provinces, setProvinces] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [sexes, setSexes] = useState([])

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
    const props = ['animal', 'race', 'province', 'municipality', 'sex']
    let filteredPets = petList

    props.forEach(prop => {
      if (filters[prop]) {
        filteredPets = filters[prop].length > 0 ? filteredPets.filter(pet => filters[prop].includes(pet[prop])) : filteredPets
      }
    })

    onFilter(filteredPets)
  }, [filters])

  useEffect(() => {
    let speciesData = []
    let racesData = []
    let provincesData = []
    let munData = []
    let sexData = []

    petList.forEach(pet => {
      if (!speciesData.includes(pet.animal)) {
        speciesData.push(pet.animal)
      }

      if (!racesData.includes(pet.race)) {
        racesData.push(pet.race)
      }

      if (!provincesData.includes(pet.province)) {
        provincesData.push(pet.province)
      }

      if (!munData.includes(pet.municipality)) {
        munData.push(pet.municipality)
      }

      if (!sexData.includes(pet.sex)) {
        sexData.push(pet.sex)
      }
    })

    setSpecies(speciesData)
    setRaces(racesData)
    setProvinces(provincesData)
    setMunicipalities(munData)
    setSexes(sexData)
  }, [])

  return (
    <div className='overflow-y-scroll' style={{ height }}>
      <h4 className='fw-bold text-dark'>Filtros</h4>
      {species.length > 0 && <div class="filter-group d-flex flex-column">
        <h5>Animal</h5>
        {species.map(sp => <div className="form-check">
          <input className="form-check-input" type="checkbox" id={sp} name='animal' onChange={handleCheck} />
          <label className="form-check-label" htmlFor={sp}>{sp}</label>
        </div>)}
      </div>}

      {races.length > 0 && <div class="filter-group d-flex flex-column">
        <h5>Raza</h5>
        {races.map(race => <div className="form-check">
          <input className="form-check-input" type="checkbox" id={race} name='race' onChange={handleCheck} />
          <label className="form-check-label" htmlFor={race}>{race}</label>
        </div>)}
      </div>}

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

      {sexes.length > 0 && <div class="filter-group d-flex flex-column">
        <h5>Sexo</h5>
        {sexes.map(sex => <div className="form-check">
          <input className="form-check-input" type="checkbox" id={sex} name='sex' onChange={handleCheck} />
          <label className="form-check-label" htmlFor={sex}>{sex}</label>
        </div>)}
      </div>}
    </div>
  )
}

export default AdoptSidebar