import {useState , useRef , useEffect} from "react";

function useGame() {
  const TIME_REMAINING = 60;
  const [text , setText] = useState("");
  const [remainingTime , setRemainingTime] = useState(TIME_REMAINING);
  const [isTimeRunning , setIsTimeRunning] = useState(false);
  const [wordCount , setWordCount] = useState(0);
  const textAreaRef = useRef(null);

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
  }

  function countWords(para) {
    const OUT = 0;
    const IN = 1;

    let state = OUT;
    let wc = 0;
    let i = 0;

    while(i < para.length) {
      if(para[i] === ' ' || para[i] === "\n" || para[i] === "\t") {
        state = OUT;
      }
      else if(state === OUT) {
        state = IN;
        ++wc;
      }
      ++i;
    }
    return wc;
  }

  function startGame() {
    setRemainingTime(TIME_REMAINING);
    setWordCount(0);
    setText("");
    textAreaRef.current.disabled = false;
    textAreaRef.current.focus();
    setIsTimeRunning(true);
  }

  function endGame() {
    setIsTimeRunning(false);
    const totalWords = countWords(text);
    setWordCount(totalWords);
  }

  useEffect( () => {

    if(isTimeRunning && remainingTime > 0) {

      setTimeout( () => {
        setRemainingTime(prev => prev-1);
      } , 1000 )
    }

    else if(remainingTime === 0) {
      endGame();
    }

  } , [remainingTime , isTimeRunning] )

  return [text , handleChange , remainingTime , isTimeRunning , wordCount , textAreaRef , startGame];
}

export {useGame}