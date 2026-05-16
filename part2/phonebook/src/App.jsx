import { useState } from 'react'

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