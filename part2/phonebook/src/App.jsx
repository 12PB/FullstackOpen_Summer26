import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')

  const checkName = (event) => {
    const repeated = persons.filter(person => person.name === newName) 
    return repeated.length === 0
    ? addName(event) 
    : alert(`${newName} is already added to phonebook`)
  }
  
  const addName = (event) => {
    event.preventDefault()
    console.log('addName introspect:', newName)
    const personObject = {
      name: newName,
      id: String(persons.length + 1)
    }
    console.log('addName introspect:', persons)
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={checkName}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNameChange}
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