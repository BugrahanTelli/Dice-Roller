import './App.css';
import React, { useState } from 'react';

function App() {
  const [numofdice, setNumofdice] = useState(1); 
  const [numofsurfaces, setNumofsurfaces] = useState(6); 
  const [numbers, setNumbers] = useState([1]);

  const rollDice = () => {
    const newNumbers = Array.from({ length: numofdice }, () => Math.floor(Math.random() * numofsurfaces) + 1);
    setNumbers(newNumbers);
  };

  const rollSingleDice = (index) => {
    setNumbers((prevNumbers) =>
      prevNumbers.map((num, i) => (i === index ? Math.floor(Math.random() * numofsurfaces) + 1 : num))
    );
  };

  const handleDiceChange = (e) => {
    const count = Number(e.target.value);
    setNumofdice(count);
    setNumbers(Array.from({ length: count }, () => Math.floor(Math.random() * numofsurfaces) + 1));
  };

  const handleSurfacesChange = (e) => {
    const count = Number(e.target.value);
    setNumofsurfaces(count);
    setNumbers(Array.from({ length: numofdice }, () => Math.floor(Math.random() * count) + 1));
  };

  const addDice = () => {
    const newNumOfDice = numofdice + 1;
    setNumofdice(newNumOfDice);
    setNumbers([...numbers, Math.floor(Math.random() * numofsurfaces) + 1]);
  };

  const removeDice = () => {
    if (numofdice > 1) {
      setNumofdice(numofdice - 1);
      setNumbers(numbers.slice(0, -1));
    }
  };

  const diceOptions = [...Array(numofdice + 1).keys()].map((x) => x + 1);

  return (
    <>
      <div className='container'>
        <div className='select-container'>
          <div className='numofdice'>
            <h1 className='title'>Number of Dice</h1>
            <select className='select' onChange={handleDiceChange} value={numofdice}>
              {diceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='numofsurfaces'>
            <h1 className='title'>Number of Surfaces</h1>
            <select className='select' onChange={handleSurfacesChange} value={numofsurfaces}>
              {[4, 6, 8, 10, 12, 20].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='dice-container'>
          {numbers.map((num, index) => (
            <button key={index} className='dice' onClick={() => rollSingleDice(index)}>
              <h2>{num}</h2>
            </button>
          ))}
        </div>
        <div className='btn-container'>
          <button className='btn rmvdice' onClick={removeDice}>Remove Dice</button>
          <button className='btn roll' onClick={rollDice}>Roll All</button>
          <button className='btn adddice' onClick={addDice}>Add Dice</button>
        </div>
      </div>
    </>
  );
}

export default App;
