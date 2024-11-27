import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Identifiants incorrects');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token); // Stocke le token dans le localStorage
        setMessage('Connexion réussie !');
        navigate('/'); // Redirige vers la page d'accueil
      })
      .catch((err) => setMessage(err.message));
  };

  return (
    <div>
      <h1>Connexion</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
