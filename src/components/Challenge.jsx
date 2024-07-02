import { useEffect, useRef, useState } from "react";
import styles from "./challenge.module.css";

export default function Challenge({ quote, setSelect, canSelect}) {
  // states:
  const [typedWords, setTypedWords] = useState(0);
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(0);

  const splitQuote = quote.split(" ");

  // refs:
  const typedWordsRef = useRef(0);

  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);

  function handleChange(event) {
    setText(event.target.value);
    if (splitQuote[typedWords] + " " == event.target.value) {
      setTypedWords(typedWords + 1);
      setText("");
      if (typedWords == splitQuote.length - 1) {
        setSelect(true)
      }
    }
  }

  useEffect(() => {
    let secondsPassed = 0;
    let wpm;
    setWpm(0);
    const interval = setInterval(() => {
      secondsPassed++;
      wpm = Math.round(typedWordsRef.current / (secondsPassed / 60));
      setWpm(wpm);
    }, 1000);

    return () => { clearInterval(interval); alert(`Final WPM: ${wpm}`)}
  }, [canSelect]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.quoteDiv}>{quote}</div>
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
