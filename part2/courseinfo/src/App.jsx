const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({parts}) => <div>{parts.map(Part)}</div>

const Part = (part) => (
  <p key={part.id}>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({course}) => {
  const total = course.parts.reduce((accumulator,part) => accumulator + part.exercises,0)
  return (
    <div>
    <Header courseName={course.name}/>
    <Content parts={course.parts}/>
    Total of {total} exercises
    </div>
)
}

const App = () => {
  const course = {
    id: 1,
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ],
  }

  return <Course course={course} />
}

export default App