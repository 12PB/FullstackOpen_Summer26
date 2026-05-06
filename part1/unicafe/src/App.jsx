import { useState } from 'react'

const Header = ({title}) => {
  return (
    <div>
    <h1>{title}</h1>
    </div>
  )
}

const Display = ({feedback}) => {
  // console.log(feedback[feedback.length - 1])
  if (feedback[feedback.length - 1] === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <Statistics feedback={feedback}/>
  )
}

const Statistics = ({feedback}) => {
  let [good, neutral, bad, count]= feedback
  let avg = (good*1 + bad*-1) / count
  let positive = good / count
  return (
    <div> 
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {count}</p>
      <p>average {avg}</p>
      <p>positive {positive}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = [good, neutral, bad, good + neutral + bad]

  const title = 'give feedback'
  const subheader = 'statistics'

  const goodIncrease = () => setGood(good + 1)
  const neutralIncrease = () => setNeutral(neutral + 1)
  const badIncrease = () => setBad(bad + 1)

  return (
    <div>
      <Header title={title}/>
      <Button onClick={goodIncrease} text="good"/>
      <Button onClick={neutralIncrease} text="neutral"/>
      <Button onClick={badIncrease} text="bad"/>
      <Header title={subheader}/>
      <Display feedback={statistics}/>
    </div>
  )
}

export default App