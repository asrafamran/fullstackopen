import { useState } from "react";

const Statistic = (props) => {
  let { good, neutral, bad } = props;
  let all = good + neutral + bad;
  let average = (good * 1 + neutral * 0 + bad * -1) / all;
  let positive = (good / all) * 100;
  return (
    <>
      <StatisticLine text={"all"} value={all} />
      <StatisticLine text={"average"} value={(average).toFixed(1)} />
      <StatisticLine text={"positive"} value={(positive).toFixed(1)+'%'} />
    </>
  );
};

const Button = ({ handle, text }) => {
  return <button onClick={handle}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handle={() => setGood(good + 1)} text={"good"} />
      <Button handle={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handle={() => setBad(bad + 1)} text={"bad"} />
      <h1>statistic</h1>
      {good == 0 && neutral == 0 && bad == 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td>good {good}</td>
              </tr>
              <tr>
                <td>neutral {neutral}</td>
              </tr>
              <tr>
                <td>bad {bad}</td>
              </tr>
              <Statistic good={good} neutral={neutral} bad={bad} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
