const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  );
};

const Header = ({ head }) => {
  return <h1>{head}</h1>;
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course, i) => (
        <div key={i}>
          <Header head={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

export default App;