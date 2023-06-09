import { useState } from "react";

const Votes = ({ max }) => {
  return <p>has {max} votes</p>;
};

const MostVotes = ({ text, vote, selected }) => {
  const votes = [...vote];
  const max = Math.max(...vote);
  const index = votes.indexOf(max);
  console.log(max, index);
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {text[index]}
      {<Votes max={max} />}
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    console.log(votes);
  };

  const handleNext = () => {
    setSelected(selected + 1);
    console.log(votes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => handleNext()}>next anecdote</button>
      <MostVotes text={anecdotes} vote={votes} selected={selected} />
    </div>
  );
};

export default App;
