import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCv, setHasCv] = useState(false); // Indique si l'utilisateur a un CV
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Vérifie si l'utilisateur est connecté

    if (token) {
      // Vérifie si l'utilisateur a un CV
      fetch('/cvs/mycv', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setHasCv(true); // L'utilisateur a un CV
          } else if (response.status === 404) {
            setHasCv(false); // Aucun CV trouvé
          }
        })
        .catch(() => setHasCv(false)); // Erreur réseau ou autre
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    localStorage.removeItem('username'); // Supprime le nom d'utilisateur
    setIsLoggedIn(false); // Met à jour l'état
    setHasCv(false); // Réinitialise l'état du CV
    navigate('/'); // Redirige vers la page d'accueil
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
          <Link to="/recommendations" style={{ textDecoration: 'none', color: 'black' }}>
            Recommandations
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            hasCv ? (
              <Link to="/mycv" style={{ textDecoration: 'none', color: 'black' }}>
                Mon CV
              </Link>
            ) : (
              <Link to="/create-cv" style={{ textDecoration: 'none', color: 'black' }}>
                Créer un CV
              </Link>
            )
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              Créer un CV
            </Link>
          )}
        </li>
        <li>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
            Profil
          </Link>
        </li>
        <li style={{ marginLeft: 'auto' }}>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                padding: '5px 10px',
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', marginRight: '10px' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    background: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Se connecter
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    background: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  S'inscrire
                </button>
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
