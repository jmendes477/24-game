// App.jsx
import React, { useState } from 'react';

function getRandomNumbers() {
  const nums = [];
  while (nums.length < 4) {
    nums.push(Math.floor(Math.random() * 9) + 1); // numbers from 1 to 9
  }
  return nums;
}

function App() {
  const [numbers, setNumbers] = useState(getRandomNumbers());
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  function handleCheck() {
    try {
      const used = input.match(/\d+/g)?.map(Number) || [];
      const sortedInput = [...used].sort((a, b) => a - b);
      const sortedNumbers = [...numbers].sort((a, b) => a - b);

      const isCorrectNumbers =
        JSON.stringify(sortedInput) === JSON.stringify(sortedNumbers);

      // Evaluate the expression safely
      // eslint-disable-next-line no-eval
      const result = eval(input);

      if (!isCorrectNumbers) {
        setMessage('❌ You must use each of the given numbers exactly once.');
      } else if (Math.abs(result - 24) < 0.0001) {
        setMessage('✅ Correct! You made 24!');
      } else {
        setMessage(`❌ Your result is ${result}, not 24.`);
      }
    } catch {
      setMessage('⚠️ Invalid expression. Try again.');
    }
  }

  function handleNewGame() {
    setNumbers(getRandomNumbers());
    setInput('');
    setMessage('');
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>🎯 24 Game</h1>
      <p>Use all four numbers exactly once to make 24.</p>
      <h2>{numbers.join(', ')}</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. (8 / (3 - 8/6))"
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />
      <br /><br />
      <button onClick={handleCheck} style={{ marginRight: '1rem' }}>Check</button>
      <button onClick={handleNewGame}>New Numbers</button>

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>
    </div>
  );
}

export default App;
