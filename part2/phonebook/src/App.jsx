import { useState, useEffect } from 'react'
import axios from 'axios'

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
      type="number"
      value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, searchTerm}) => {
  
 const filteredList = (searchTerm === '')
    ? persons
    : persons.filter((person) => 
      person.name.toLowerCase().includes(searchTerm))
  return(   
     <dl> 
      {filteredList.map(person => 
        <Person key={person.id} person={person} />
      )}
    </dl>
    )
} 

const Person = ({person}) => {
  return <dt>{person.name} {person.number}</dt>
}



const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  const checkName = (event) => {
    const repeated = persons.filter(person => person.name === newName) 
    return repeated.length === 0
    ? addPerson(event) 
    : alert(`${newName} is already added to phonebook`)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App