import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({persons, removePersonOf}) => {
  return persons.map(
    person=><Person key={person.id} name={person.name} number={person.number} 
    removePerson={()=>removePersonOf(person.id)} />
    )
}

const Person = ({name, number, removePerson}) => {
  return <div>
    {name} {number}
    <button onClick={removePerson}>delete</button>
  </div>
}



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(initialValue=>{
        setPersons(initialValue)
      })
  }, [])
  
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

  const removePersonOf = id => {
    const personToRemove = persons.find(person=>person.id === id)
    if(window.confirm(`Delete ${personToRemove.name}?`)) { 
      personService
        .remove(id)
        .then(initialValue => {
          console.log(initialValue)
          setPersons(persons.filter(person=>person.id !== id))
        })
      }
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
      personService
        .create(newPerson)
        .then(initialValue => {
          setPersons(persons.concat(initialValue))
        })
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
        <Persons persons={personsToShow} removePersonOf={removePersonOf} />
    </div>
  )
}

export default App