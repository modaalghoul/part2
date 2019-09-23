import React from 'react'

const Course = ({course}) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Part = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
  const Header = ({name}) => {
    return <h1>{name}</h1>
  }
  
  const Content = ({parts}) => {
    return(
      <>
        {parts.map( (part) => (<Part key={part.id} part ={part} />))}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.map(part => part.exercises).reduce( (total, exercises) => total+exercises , 0 )
    return <p>total of {total} exercises</p>
  }

  export default Course