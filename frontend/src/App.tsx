import React, {useState} from 'react';

function App() {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div>
      <h1 onClick={() => setCounter(counter + 1)}>Hello Budget: {counter}</h1>
    </div>
  );
}

export default App;
