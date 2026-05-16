const Person = ( {person} ) => {
  console.log('Person introspect:', person.name)
  return <dt>{person.name}</dt>
}

export default Person