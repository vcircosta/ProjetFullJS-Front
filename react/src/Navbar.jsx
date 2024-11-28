import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; // Vérifie si le token existe

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    localStorage.removeItem('email'); // Supprime l'email
    navigate('/login'); // Redirige vers la page de connexion
  };

  // Redirige vers /login si non connecté
  const handleProtectedRoute = (route) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(route);
    }
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            Accueil
          </Link>
        </li>
        <li>
          <button
            onClick={() => handleProtectedRoute('/recommandations')}
            style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Recommandations
          </button>
        </li>
        <li>
          <button
            onClick={() => handleProtectedRoute('/cv')}
            style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer', textDecoration: 'underline' }}
          >
            CV
          </button>
        </li>
        <li>
          <button
            onClick={() => handleProtectedRoute('/profile')}
            style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Profil
          </button>
        </li>
        <li style={{ marginLeft: 'auto' }}>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', marginRight: '10px' }}>
                <button style={{ padding: '5px 10px', cursor: 'pointer' }}>Connexion</button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '5px 10px', cursor: 'pointer' }}>Inscription</button>
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
