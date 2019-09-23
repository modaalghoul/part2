import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <>
      <h1>{country.countryInfo.name}</h1>
      <div>capital {country.countryInfo.capital}</div>
      <div>population {country.countryInfo.population}</div>
      <h2>languages</h2>
      <ul>
        {
          country.countryInfo.languages.map (
            language => 
            <li key={language.name}>
              {language.name}
            </li>
            )
        }
      </ul>
      <div>
        <img 
          src={country.countryInfo.flag} 
          alt={country.countryInfo.name + 'flag'} 
          height="100" width="100"
          />
      </div>
      <h2>Weather in {country.countryInfo.capital}</h2>
      <div>
        <strong>temperature:</strong> {country.weather.temperature}
      </div>
      <div>
        <img src={country.weather.weather_icons[0]} alt={country.countryInfo.capital} />
      </div>
      <div>
        <strong>wind:</strong> {country.weather.wind_speed} kph direction {country.weather.wind_dir}
      </div>
    </>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countryName, setCountryName ] = useState('')
  const [ showSpecific, setShowSpecific ] = useState(false)
  const [ specificCountry, setSpecificCountry ] = useState( {countryInfo: {}, weather: {}} )

  const weatherAPIAccessKey = '28288f8ffbdc3779329673b124a9c74a'
  
  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response=>{
        setCountries(response.data)
      })
  }, [])
  
  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value)
    setSpecificCountry({countryInfo: {}, weather: {}})
    setShowSpecific(false)
  }

  const handleShowSpecific = (event) => {
    const country = countries.filter(c=>c.numericCode===event.target.value)[0]
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weatherAPIAccessKey}&query=${country.capital}`)
      .then( response =>{
        setSpecificCountry({countryInfo: country, weather: response.data.current})
        setShowSpecific(true)
      })
    
  }      

  const countriesToShow = countries.filter(country=>country.name.match(new RegExp(countryName, 'i')))

  const countriesQueryView = () => {
    if(!showSpecific) {
      if(countriesToShow.length>10) 
        return (<div>Too many matches, specify another filter</div>)
      else
        if(countriesToShow.length===1) {
          const country = countriesToShow[0]
          axios
            .get(`http://api.weatherstack.com/current?access_key=${weatherAPIAccessKey}&query=${country.capital}`)
            .then( response =>{
              setSpecificCountry({countryInfo: country, weather: response.data.current})
              setShowSpecific(true)
            })
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