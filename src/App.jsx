import { useState } from "react";

let intervalId;

const initialTime = {
  h: 0,
  m: 0,
  s: 0,
};

const addZero = (num) => {
  return String(num).padStart(2, "0");
};

const App = () => {
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  const timeHandler = (time) => {
    if (time.s < 59) {
      return { ...time, s: time.s + 1 };
    } else {
      if (time.m < 59) {
        return { ...time, m: time.m + 1, s: 0 };
      } else {
        if (time.h < 23) {
          return { ...time, h: time.h + 1, m: 0, s: 0 };
        } else {
          return initialTime;
        }
      }
    }
  };

  const startTimer = () => {
    if (!intervalId) {
      intervalId = setInterval(() => setTime(timeHandler), 1000);
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const resetTimer = () => {
    setTime(initialTime);
    clearInterval(intervalId);
    intervalId = undefined;
  };

  return (
    <div className="wrapper">
      <h1>
        {addZero(time.h)}:{addZero(time.m)}:{addZero(time.s)}
      </h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default App;
