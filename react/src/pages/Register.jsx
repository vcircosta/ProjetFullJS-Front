import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // Send registration request
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password });

      // Check if registration was successful
      if (response.status === 201) {
        navigate('/login'); // Redirect to login page
      }
    } catch (err) {
      // Handle different error scenarios
      if (err.response) {
        // If we get a response from the server (e.g., validation error)
        setError(err.response.data.message || 'Erreur lors de l\'inscription. Vérifiez vos informations.');
      } else if (err.request) {
        // If no response from the server
        setError('Impossible de joindre le serveur. Vérifiez votre connexion.');
      } else {
        // If something went wrong in setting up the request
        setError('Une erreur est survenue. Essayez à nouveau.');
      }
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Inscription...' : "S'inscrire"} {/* Loading button text */}
        </button>
      </form>
      <p>
        Déjà un compte ? <Link to="/login">Connectez-vous ici</Link>
      </p>
    </div>
  );
};

export default Register;
