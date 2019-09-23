import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {
          country.languages.map (
            language => 
            <li key={language.name}>
              {language.name}
            </li>
            )
        }
      </ul>
      <div>
        <img 
          src={country.flag} 
          alt={country.name + 'flag'} 
          height="100" width="100"
          />
      </div>
    </>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countryName, setCountryName ] = useState('')
  const [ showSpecific, setShowSpecific ] = useState(false)
  const [ specificCountry, setSpecificCountry ] = useState( {} )
  
  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response=>{
        setCountries(response.data)
      })
  }, [])
  
  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value)
    setSpecificCountry({})
    setShowSpecific(false)
  }

  const handleShowSpecific = (event) => {
    const country = countries.filter(c=>c.numericCode===event.target.value)[0]
    setSpecificCountry(country)
    setShowSpecific(true)
  }      

  const countriesToShow = countries.filter(country=>country.name.match(new RegExp(countryName, 'i')))

  const countriesQueryView = () => {
    if(!showSpecific) {
      if(countriesToShow.length>10) 
        return (<div>Too many matches, specify another filter</div>)
      else
        if(countriesToShow.length===1) {
          const country = countriesToShow[0]
          setSpecificCountry(country)
          setShowSpecific(true)
        }
        else 
          if (countriesToShow.length===0) return (<div>no such country</div>)
      else
        return countriesToShow.map(country =>
        <div key={country.numericCode}>
          {country.name}
          <button value={country.numericCode} onClick={handleShowSpecific}>show</button>
        </div>)
    }
    else 
      return <Country country={specificCountry} />    
  }

  return (
    <div>
      find countries <input value={countryName} onChange={handleCountryNameChange} />
      {countriesQueryView()}
    </div>
  )
}

export default App