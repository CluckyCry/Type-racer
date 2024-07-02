import styles from "./confirm.module.css";
import Challenge from "./Challenge";
import { useState } from "react";

export default function Confirm({ check, setCheck, canSelect, setSelect }) {
  const [quote, setQuote] = useState("");

  let difficulty;
  let minL, maxL;
  let url = "https://api.quotable.io/random?";

  async function onClicked() {
    if (canSelect && check == "") {
      alert("Please select a difficulty");
      return;
    }

    if (canSelect && check != "") {
      difficulty = check;

      minL = 300;
      maxL = 450;

      if (difficulty == "Easy") {
        minL = 50;
        maxL = 100;
      } else if (difficulty == "Medium") {
        minL = 110;
        maxL = 250;
      }

      // Fetch:
      try {
        const response = await fetch(
          url + `minLength=${minL}&maxLength=${maxL}`
        );
        if (!response.ok)
          alert("Error occured during an API request. Please try again.");
        const responseJson = await response.json(); // JSON
        setQuote(responseJson.content)

        setSelect(false); // So a player can't start a challenge again.
        setCheck("");
      } catch (err) {
        alert("Error occured during an API request. Please try again.");
      }
    } else {
      alert("You can't play while already in a challenge");
    }
  }

  return (
    <>
      <input
        onClick={onClicked}
        className={styles.confirm}
        type="button"
        value="Confirm difficulty"
      />
      {!canSelect && <Challenge quote={quote} setSelect={setSelect} canSelect={canSelect}/>}
    </>
  );
}
