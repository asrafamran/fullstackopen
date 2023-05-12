const App = () => {
  const course = "Half Stack application development";
  parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

  const Content = (props) => {
    return (
      <>
        <p>
          Hello
          {props.part1.name} {props.part1.exercises}
        </p>
        <p>
          {props.part2.name} {props.part2.exercises}
        </p>
        <p>
          {props.part3.name} {props.part3.exercises}
        </p>
      </>
    );
  };

  const Total = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.part1.exercises + props.part2.exercises + props.part3.exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
