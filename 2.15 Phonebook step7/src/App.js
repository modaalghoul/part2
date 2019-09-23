import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
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
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
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
        <Persons persons={personsToShow} />
    </div>
  )
}

export default App