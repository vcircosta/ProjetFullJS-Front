import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllCVs() {
  const [cvs, setCvs] = useState([]); // Liste des CV visibles
  const [error, setError] = useState(''); // Message d'erreur
  const [search, setSearch] = useState({ nom: '', prenom: '' }); // Champs de recherche
  const navigate = useNavigate();

  // Fonction pour rechercher des CV en fonction des critères saisis
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(search.nom && { nom: search.nom }),
      ...(search.prenom && { prenom: search.prenom }),
    }).toString();

    fetch(`/cvs/search?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Aucun CV correspondant trouvé.');
        }
        return response.json();
      })
      .then((data) => {
        setCvs(data);
        setError(''); // Réinitialise les erreurs
      })
      .catch((err) => {
        setCvs([]); // Vide les résultats
        setError(err.message);
      });
  };

  // Fonction pour réinitialiser la recherche et recharger tous les CV visibles
  const handleReset = () => {
    setSearch({ nom: '', prenom: '' }); // Réinitialise les champs de recherche
    setError(''); // Efface les erreurs
    fetch('/cvs/public')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des CV visibles.');
        }
        return response.json();
      })
      .then((data) => setCvs(data))
      .catch((err) => setError(err.message));
  };

  // Charger tous les CV visibles au chargement initial de la page
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

  // Rediriger vers la page "Mon CV"
  const handleMyCv = () => {
    navigate('/mycv');
  };

  return (
    <div>
      <h1>Bienvenue</h1>

      {/* Boutons S'inscrire et Se connecter */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>
          S'inscrire
        </button>
        <button onClick={() => navigate('/login')}>Se connecter</button>
      </div>

      <h2>CV Visibles</h2>

      {/* Barre de recherche */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nom"
          value={search.nom}
          onChange={(e) => setSearch({ ...search, nom: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={search.prenom}
          onChange={(e) => setSearch({ ...search, prenom: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ marginRight: '10px' }}>
          Rechercher
        </button>
        <button onClick={handleReset}>Réinitialiser</button>
      </div>

      {/* Bouton Mon CV */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleMyCv} style={{ padding: '10px', fontSize: '16px' }}>
          Mon CV
        </button>
      </div>

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
            <button onClick={() => navigate(`/cv/${cv._id}`)}>
              Détails
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllCVs;
