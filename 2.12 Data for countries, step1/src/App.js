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
        {country.languages.map((language)=><li key={language.name}>{language.name}</li>)}
      </ul>

      <div>
        <img src={country.flag} alt={country.name + 'flag'} height="100" width="100"/>
      </div>
    </>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countryName, setCountryName ] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response=>{
        setCountries(response.data)
      })
  }, [])

  
  const handleCountryName = (event) => {
    setCountryName(event.target.value)
  }

  const countriesQuery = () => {
    const countriesToShow = countries.filter(country=>country.name.match(new RegExp(countryName, 'i')))
    if(countriesToShow.length>10) {
      return (<div>Too many matches, specify another filter</div>)
    }
    else if(countriesToShow.length===1) {
      return <Country country={countriesToShow[0]} />
    } 
    else 
      return countriesToShow.map(country=><div key={country.numericCode}>{country.name}</div>)
  }

  return (
    <div>
      find countries <input value={countryName} onChange={handleCountryName} />
      {countriesQuery()}
    </div>
    
  )
}

export default App