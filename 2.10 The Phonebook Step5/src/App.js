import React, { useState } from 'react'

const Filter = ({inputValue, onChangeHandler}) => {
  return (
    <div>
      filter shown with: <input value={inputValue} onChange={onChangeHandler}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.name} onChange={props.nameChangeHandler}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.numChangeHandler}/>
      </div>
      <div>
        <button onClick={props.submit} type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return persons.map(person=><Person key={person.name} name={person.name} number={person.number} />)
}

const Person = ({name, number}) => {
  return <div>{name} {number}</div>
}



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
  
  const personsToShow = persons.filter(person=>person.name.match(new RegExp(newSearch, 'i')))
 
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

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter inputValue={newSearch} onChangeHandler={handleSearchByName} />
      
      <h3>add a new</h3>
        <PersonForm 
          name={newName} nameChangeHandler={handleNameChange}
          number={newNumber} numChangeHandler={handleNumberChange}
          submit={addName}
          />
      
      <h3>Numbers</h3>
        <Persons persons={personsToShow} />
    </div>
  )
}

export default App