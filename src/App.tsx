import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

type Operand = "+" | "-" | "*" | "/";

function App() {
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [val, setVal] = useState<number | null>(null);
  const [operand, setOperand] = useState<Operand | null>(null);

  const createSetter = (N: number) => {
    return () => {
      if (val !== null) {
        setVal(val * 10 + N);
      } else {
        setVal(N);
      }
    }
  }

  const createOperand = (operand: Operand) => {
    return () => {
      if (val === null) {
        return;
      }

      setPrevVal(val);
      setVal(null);
      setOperand(operand);
    };
  };

  const onEqual = () => {
    if (val === null || prevVal === null || operand === null) {
      return;
    }

    switch(operand) {
      case "+":
        setVal(prevVal + val);
        break;
      case "-":
        setVal(prevVal - val);
        break;
      case "*":
        setVal(prevVal * val);
        break;
      case "/":
        setVal(prevVal / val);
        break;
    }

    setPrevVal(null);
    setOperand(null);
  };

  return (
    <div className="App">
      <div className="App-header">
        {Array.from({length: 10}).map((_, i) => <button onClick={createSetter(i)}>{i}</button>)}
        {(["+", "-", "*", "/"] as const).map(operand => <button onClick={createOperand(operand)}>{operand}</button>)}
        <button onClick={onEqual}>=</button>
        <p>{val}</p>
      </div>
    </div>
  );
}

export default App;
