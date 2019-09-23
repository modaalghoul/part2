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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState(null)

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

  if(message) setTimeout(()=>{setMessage(null)}, 3000)

  const addName = (event) => {
    event.preventDefault()
    const personExists = persons.find(person=>person.name===newName)

    if ( personExists ) {
      if (personExists.number===newNumber) alert(`${newName} is already added to phonebook`)
      else 
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const newPerson = { ...personExists, number: newNumber }
          personService
            .update(personExists.id, newPerson)
            .then(initialValue => {
              setPersons(persons.map(person => person.id===initialValue.id ? initialValue : person ))
              setMessage(`Updated ${initialValue.name}`)
            })
        }
    }
    else { // person does not exist
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(initialValue => {
          setPersons(persons.concat(initialValue))
          setMessage(`Added ${initialValue.name}`)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
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