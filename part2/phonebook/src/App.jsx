import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '55010024',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </dl>
    </div>
  )
}

export default App