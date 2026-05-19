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
  console.log(countryName, countries)
  const targetCountry = countries.find((country) => 
    (country.name.common === countryName))
  const capital = targetCountry.capital
  const langArr = Object.values(targetCountry.languages)
  console.log(targetCountry.flag)

  return (
    <> 
    <h1>{countryName}</h1>
    <div> 
      <dl>
        <dt> Capital {capital} </dt>
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

const Results = ({searchTerm, countryNames, countries}) => {
  const filteredList = Search(searchTerm, countryNames)
  if (filteredList.length > 10) {
    return (
      <dt>Too many matches, specify another filter </dt>
    )
  }
  if (filteredList.length > 1) {
    return (
      <dl>
        {filteredList.map((country) => <li key={country}>{country}</li>)}
      </dl>
  )}
  if (filteredList.length === 1) {
  const [countryName] = filteredList
  return <RenderCountry countryName={countryName} countries={countries}/>
  }

}


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countryNames, setCountryNames] = useState([])
  const [countries, setCountries] = useState([])
  
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const changeState = ({countryList}) => {
    setCountries(countryList)
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


  return (
    <div>
        <Filter 
      searchTerm={searchTerm}
      handleSearchTerm={handleSearchTerm}
      />
      <Results searchTerm={searchTerm} countryNames={countryNames} countries={countries}/>
    </div>
  )
}

export default App