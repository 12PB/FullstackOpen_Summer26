const Render = ({person, deletePerson}) => {    
    return ( 
    <dt>
    {person.name} {person.number}
    <button 
    onClick={() =>
        (window.confirm(`Delete ${person.name} ?`))
        ? deletePerson(person.id)
        : console.log("User does not want to delete entry")
    }>
        delete
    </button>
    </dt>
    )
}

const Person = ({persons, searchTerm,deletePerson}) => {   
    const filteredList = (searchTerm === '')
        ? persons
        : persons.filter((person) => 
        person.name.toLowerCase().includes(searchTerm))
  return(   
     <dl className='person'> 
      {filteredList.map((person) => 
      <Render 
      key={person.id}
      person={person} 
      deletePerson={deletePerson}
       />)}
    </dl>
    )
} 

export default Person