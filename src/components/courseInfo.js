
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s+p.exercises, 0)
    return (<p>Number of exercises {total}</p>)}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    const partsToReturn=[]
    for (let index = 0; index < parts.length; index++)
        partsToReturn.push(<Part key={parts[index].id} part ={parts[index]}/>)
    return partsToReturn;
}
const Course = ({course}) => {
    const parts = course.parts;
    return (
        <div>
          <Header course={course.name} />
          <Content parts={parts} />
          <Total parts={parts}/>
        </div>
      )
}
const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
            }
            
          ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
              {
                name: 'Routing',
                exercises: 3,
                id: 1
              },
              {
                name: 'Middlewares',
                exercises: 7,
                id: 2
              }
            ]
          }
    ]
    const coursesToReturn = [];
    for (let index = 0; index < courses.length; index++)
        coursesToReturn.push(<Course key={courses[index].id} course={courses[index]}/>)
    
    return coursesToReturn;
           
    
}
export default App
