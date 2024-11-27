import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/healthcheck')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Erreur:', error));
  }, []);

  return (
    <div>
      <h1>React + Vite</h1>
      <p>{message}</p>
    </div>
  );
  
}

export default App;
