import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllCVs() {
  const [cvs, setCvs] = useState([]); // Liste des CV visibles
  const [error, setError] = useState(''); // Message d'erreur
  const navigate = useNavigate();

  // Charger les CV visibles
  useEffect(() => {
    fetch('/cvs/public', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le token JWT
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des CV visibles.');
        }
        return response.json();
      })
      .then((data) => setCvs(data))
      .catch((err) => setError(err.message));
  }, []);

  // Rediriger vers les détails du CV
  const handleDetails = (cvId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirige vers la page de connexion si non connecté
    } else {
      navigate(`/cv/${cvId}`); // Redirige vers les détails du CV
    }
  };

  return (
    <div>
      <h2>CV Visibles</h2>

      {/* Gestion des erreurs */}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : cvs.length === 0 ? (
        <p>Aucun CV visible trouvé.</p>
      ) : (
        cvs.map((cv) => (
          <div
            key={cv._id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h2>{cv.title}</h2> {/* Titre du CV */}
            <h3>
              {cv.prenom} {cv.nom}
            </h3>
            <p>
              <strong>Description:</strong> {cv.description}
            </p>
            <button
              onClick={() => handleDetails(cv._id)}
              style={{
                padding: '10px 20px',
                background: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Détails
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllCVs;
