import { useState } from "react";
import Header from "./components/Header";
import Text from "./components/Text";
import Selection from "./components/Selection";
import Confirm from "./components/Confirm";
import Challenge from "./components/Challenge";

export default function App() {
  const [canSelect, setSelect] = useState(true);
  const [check, setCheck] = useState(""); // STATE for handling the inputs

  return (
    <div>
      <Header />
      <Text />
      <Selection check={check} setCheck={setCheck} />
      <Confirm
        check={check}
        setCheck={setCheck}
        canSelect={canSelect}
        setSelect={setSelect}
      />
    </div>
  );
}
