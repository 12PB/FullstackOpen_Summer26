import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const searchResults = (searchTerm === '')
    ? persons
    : persons.filter((person) => 
      person.name.toLowerCase().includes(searchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input 
      value={searchTerm}
      onChange={handleSearchTerm}
      />
      <h2>Add a new entry</h2>
      <form onSubmit={checkName}>
        <div>
          Name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          Number: 
          <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <dl> 
        {searchResults.map(person => 
          <Person key={person.id} person={person} />
        )}
      </dl>
    </div>
  )
}

export default App