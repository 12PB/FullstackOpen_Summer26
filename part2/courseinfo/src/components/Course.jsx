const Header = ({courseName}) => <h3>{courseName}</h3>

const Content = ({parts}) => <div>{parts.map(Part)}</div>

const Part = (part) => (
  <p key={part.id}>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = (course) => {
  const total = course.parts.reduce((accumulator,part) => accumulator + part.exercises,0)
  return (
    <div key={course.id}>
    <Header courseName={course.name}/>
    <Content parts={course.parts}/>
    <b> Total of {total} exercises </b>
    </div>
)
}

export default Course
