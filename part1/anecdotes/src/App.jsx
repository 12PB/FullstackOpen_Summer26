import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Display = ({anecdotes, index}) => {
  return (
    <div>
      {anecdotes[index]} 
    </div>
  )
}

const DisplayMax = ({anecdotes, index}) => {
  let {maxVal, maxIndex} = index

  if (maxVal === 0) {
    return
  }
  return (
    <div> 
    <h2>Anecdote with most votes</h2>
    {anecdotes[maxIndex]}
    <p>has {maxVal} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [random, setRandom] = useState(0)
  const emptyArr = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(emptyArr)
  const [max, setMax] = useState({maxVal: 0, maxIndex: 0})

  const onNext = () => setRandom(getRandomInt(0,anecdotes.length - 1))
  const onVote = () => {
    const copy = [... votes]
    copy[random] += 1
    setVotes(copy)

    if (copy[random] > max['maxVal']) {
      setMax({maxVal: copy[random], maxIndex: random})
    }
    return
  }  

  return (
    <div> 
    <h2>Anecdote of the day</h2>
    <Display anecdotes={anecdotes} index={random}/>
    <p>has {votes[random]} votes</p>
    <Button onClick={onNext} text="next anecdote"/>
    <Button onClick={onVote} text="vote"/>
    <DisplayMax anecdotes={anecdotes} index={max}/>
    </div>
  )
}

export default App