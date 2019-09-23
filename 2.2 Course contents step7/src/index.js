import React from 'react'
import ReactDOM from 'react-dom'

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
      {parts.map( (part, i) => (<Part key={i} part ={part} />))}
    </>
  )
}

const Total = ({parts}) => {
  let total = 0
  parts.forEach(part => {
    total += part.exercises
  })
  return <p>total of {total} exercises</p>
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))