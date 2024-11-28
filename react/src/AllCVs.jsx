import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllCVs() {
  const [cvs, setCvs] = useState([]); // Liste des CV visibles
  const [error, setError] = useState(''); // Message d'erreur
  const [search, setSearch] = useState({ nom: '', prenom: '' }); // Champs de recherche
  const [user, setUser] = useState(null); // Informations utilisateur connecté
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  // Fonction pour afficher les détails d'un CV (redirige vers /login si non connecté)
  const handleDetails = (cvId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirige vers /login si non connecté
    } else {
      navigate(`/cv/${cvId}`); // Redirige vers les détails du CV
    }
  };

  // Fonction pour charger les CV visibles
  useEffect(() => {
    fetch('/cvs/public')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des CV visibles.');
        }
        return response.json();
      })
      .then((data) => setCvs(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>CV Visibles</h2>

      {/* Gestion des résultats */}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : cvs.length === 0 ? (
        <p>Aucun CV visible trouvé.</p>
      ) : (
        cvs.map((cv) => (
          <div key={cv._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>
              {cv.prenom} {cv.nom}
            </h2>
            <p><strong>Description:</strong> {cv.description}</p>
            <button onClick={() => handleDetails(cv._id)}>
              Détails
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllCVs;
