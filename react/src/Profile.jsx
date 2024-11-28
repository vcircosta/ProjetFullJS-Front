import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si pas de token, rediriger ou afficher un message d'erreur
      setError('Utilisateur non connecté');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.data);
        setNewUsername(response.data.data.username);
        setNewEmail(response.data.data.email);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération du profil');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const updatedData = { username: newUsername, email: newEmail };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data.data);
      setError('');
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Profil</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Mettre à jour le profil</button>
      </form>
    </div>
  );
};

export default Profile;
