import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  
  const PersonsToShow = persons.filter(person=>person.name.match(new RegExp(newSearch, 'i')))
 
  const handleSearchByName = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person=>person.name===newName)

    if ( nameExists ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
    }

  }

  const numbers = () => {
    return PersonsToShow.map(person=><div key={person.name}>{person.name} {person.number}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input value={newSearch} onChange={handleSearchByName}/>
      </div>

      <form>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {numbers()}
      
    </div>
  )
}

export default App