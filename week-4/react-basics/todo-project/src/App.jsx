import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <CustomButton count={count} setCount={setCount}></CustomButton>
    </>
  );

  function CustomButton(props) {
    function onClickHandler() {
      props.setCount((prev) => ++prev);
    }

    return <button onClick={onClickHandler}>Counter {props.count}</button>;
  }
}

export default App;
