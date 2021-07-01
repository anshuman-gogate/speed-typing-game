import React, {useState , useEffect , useRef} from 'react'
import { useGame } from './hooks/useGame'

function App() {
  const [text , handleChange , remainingTime , isTimeRunning , wordCount , textAreaRef , startGame] = useGame();

  return (
    <div className="container">
      <h1>How fast can you Type</h1>
      <textarea 
        ref={textAreaRef}
        placeholder="Let's see how fast you can type" 
        disabled={!isTimeRunning}
        value={text}
        onChange={handleChange}
      />
      <h4>Time Remaining : {remainingTime}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>Start</button>
      <h2>Word Count : {wordCount}</h2>
    </div>
  )
}

export default App
