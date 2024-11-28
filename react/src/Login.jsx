import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Réinitialise les erreurs

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
  
      // Vérifie si le token est retourné
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Stocke le token JWT
        localStorage.setItem('email', email); // Stocke l'email pour confirmation
       
        navigate('/'); // Redirige vers la page d'accueil
      } else {
        setError('Erreur lors de la connexion. Veuillez réessayer.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Identifiants incorrects. Veuillez réessayer.');
      } else if (err.request) {
        setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link>
      </p>
    </div>
  );
};

export default Login;
