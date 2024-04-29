import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount((prev) => ++prev);
        }}
      >
        Counter {count}
      </button>
    </div>
  );
}

export default Counter;
