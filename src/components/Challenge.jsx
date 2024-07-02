import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./challenge.module.css";

export default function Challenge({ quote, setSelect, canSelect }) {
  // states:
  const [typedWords, setTypedWords] = useState(0);
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(0);

  const splitQuote = quote.split(" ");

  // refs:
  const typedWordsRef = useRef(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);

  function handleChange(event) {
    let spanEle = document.getElementById(typedWords);
    let splitCurrentW = splitQuote[typedWords].split("");
    let textSplit = event.target.value.split("");

    if (event.target.value == "") 
      spanEle.style.color = 'black'

    textSplit.forEach((alphabet, index) => {
      if ((alphabet == " ") || (event.target.value == "")) return;
      if (splitCurrentW[index] == alphabet) 
        spanEle.style.color = "green"
      else
        spanEle.style.color = "red"
    })

    hasStarted.current = true;
    setText(event.target.value);
    if (
      splitQuote[typedWords] + " " == event.target.value ||
      (typedWords + 1 == splitQuote.length &&
        splitQuote[typedWords] == event.target.value)
    ) {
      setTypedWords(typedWords + 1);
      setText("");
      if (typedWords == splitQuote.length - 1) {
        hasStarted.current = false;
        setTimeout(() => setSelect(true), 2000)
      }
    }
  }

  useEffect(() => {
    let secondsPassed = 0;
    let wpm;
    setWpm(0);
    const interval = setInterval(() => {
      if (!hasStarted.current) return;
      secondsPassed++;
      wpm = Math.round(typedWordsRef.current / (secondsPassed / 60));
      setWpm(wpm);
    }, 1000);

    return () => {
      clearInterval(interval);
      alert(`Final WPM: ${wpm}`);
    };
  }, [canSelect]);

  return (
    <div className={styles.mainDiv}>
      <div id="quoteDiv">
        {splitQuote.map((word, index) => (
          <React.Fragment key={index}>
            <span key={index} id={index} className={styles.span}>
              {word}
            </span>
            <span key={index - 1}> </span>
          </React.Fragment>
        ))}
      </div>
      <input
        onChange={handleChange}
        className={styles.typeText}
        type="text"
        placeholder="Type text"
        value={text}
      />
      <h2>WPM: {wpm}</h2>
      <input
        onClick={() => setSelect(true)}
        className={styles.cancel}
        type="button"
        value="Cancel"
      />
    </div>
  );
}
