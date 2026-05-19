import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Person from './components/Person'

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

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={onSubmit}>
    <div>
      Name: 
      <input
      name="user name" 
      type="text"
      value={newName}
      onChange={handleNameChange}
      />
    </div>
    <div>
      Number: 
      <input 
      name="user name" 
      value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  const checkName = (event) => {
    const searchResult = persons.find(person => person.name === newName)
    return searchResult === undefined
    ? addPerson(event) 
    : editCheck(event, searchResult)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const editCheck = (event,searchResult) => {
    event.preventDefault()
    return (window.confirm(`${searchResult.name} is already added to phonebook, replace the old number with a new one?`))
      ? editPerson(searchResult)
      : console.log(`User does not want to edit entry for ${searchResult.name}`)
  }

  const editPerson = (searchResult) => {
    const personObject = { ...searchResult, number: newNumber,}

    personService
      .update(searchResult.id, personObject)
      .then(returnedPerson => { 
        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const deletePerson = (id) => {
    event.preventDefault()

    personService
      .deleteId(id)
      .then(returnedPersons => {
        setPersons(persons.filter(person => person.id !== id))
        console.log(`Deleted ${returnedPersons.name}`)
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      searchTerm={searchTerm}
      handleSearchTerm={handleSearchTerm}
      />
      <h3>Add a new entry</h3>
      <PersonForm
      onSubmit={checkName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Person 
      persons={persons} 
      searchTerm={searchTerm}
      deletePerson={deletePerson} />
    </div>
  )
}

export default App