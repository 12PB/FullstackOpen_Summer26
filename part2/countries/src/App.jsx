import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries.js'

const Filter = ({
searchTerm,
handleSearchTerm
}) => {
return(
  <div>
    filter shown with
    <input
    name="search filter" 
    type="text"
    value={searchTerm}
    onChange={handleSearchTerm}
    />
  </div>)
}

const Search = (searchTerm, countries) => {
  console.log("searchTerm: ",searchTerm)
  return searchTerm === ''
  ? countries
  : countries.filter((country) => 
    (country.toLowerCase().includes(searchTerm)))
}

const RenderCountry = ({countryName, countries}) => {
  if (!countryName) {
    return null
  }
  const targetCountry = countries.find((country) => 
    (country.name.common === countryName))

  if (!targetCountry) {
    return <dt>Loading country data...</dt>
  }
  const [capitalCity] = targetCountry.capital
  const langArr = Object.values(targetCountry.languages)
  return (
    <> 
    <h1>{countryName}</h1>
    <div> 
      <dl>
        <dt> Capital {capitalCity} </dt>
        <dt> Area {targetCountry.area}</dt>
      </dl>
    </div>
    <h2>Languages</h2>
    <ul>
      {langArr.map((language) => <li key={language}>{language}</li>)}
    </ul>
    {targetCountry.flag}
    </>
  )
}


const DisplayCountries = ({displayCountry,filteredList, countries,onClick}) => {
  if (filteredList.length > 10) {
    return <dt>Too many matches, specify another filter</dt>
  }

  if (displayCountry === '') {    
    return (
      <dl>
        {filteredList.map((country) =>
        (<li key={country}>
          {country}
          <button
          onClick={()=> onClick(country)}>
            Show
          </button>
        </li>))}
      </dl>
    )}
  }

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countryNames, setCountryNames] = useState([])
  const [countries, setCountries] = useState([])
  const [renderCountry, setRenderCountry] = useState('')

  
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const displayCountry = (country) => {
    setRenderCountry(country)
  }

  useEffect(() => {
  console.log('first call to api',countries.length)
  countryService
    .getAll()
    .then(response => {
      console.log('received array of size: ', response.length)
      setCountries(response)
      const countryNames = response.map((data) => data.name.common)
      setCountryNames(countryNames)
    })
  }, [])

  const filteredList = Search(searchTerm, countryNames)

  useEffect(() => {
    if (filteredList.length === 1) {
      setRenderCountry(filteredList[0])
    }
  }, [filteredList])

  return (
    <>
      <Filter 
      searchTerm={searchTerm}
      handleSearchTerm={handleSearchTerm}
      />
      <DisplayCountries 
      displayCountry={renderCountry}
      filteredList={filteredList}
      countries={countries}
      onClick={displayCountry}/>
      <RenderCountry
      countryName={renderCountry}
      countries={countries}/>
    </>
  )
}

export default App