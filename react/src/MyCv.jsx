import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyCv() {
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Charger le CV de l'utilisateur connecté
  useEffect(() => {
    fetch('/cvs/mycv', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajoute un token JWT si nécessaire
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            // Pas de CV trouvé
            setCv(null);
          } else {
            throw new Error('Erreur lors de la récupération du CV.');
          }
        }
        return response.json();
      })
      .then((data) => {
        setCv(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Fonction pour supprimer le CV
  const handleDeleteCv = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre CV ?')) {
      fetch('/cvs/mycv', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression du CV.');
          }
          return response.json();
        })
        .then(() => {
          alert('CV supprimé avec succès.');
          navigate('/'); 
        })
        .catch((err) => setError(err.message));
    }
  };

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (!cv) {
    // Si aucun CV n'existe, proposer de le créer
    return (
      <div>
        <h1>Vous n'avez pas encore de CV.</h1>
        <button
          onClick={() => navigate('/create-cv')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Créer un CV
        </button>
      </div>
    );
  }

  // Si un CV existe, l'afficher
  return (
    <div>
      <h1>Mon CV</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <h2>{cv.title}</h2>
      <h3>
        {cv.prenom} {cv.nom}
      </h3>
      <p><strong>Description:</strong> {cv.description}</p>

      <h3>Expériences Pédagogiques</h3>
      <ul>
        {cv.experiencesPedagogiques.map((exp, index) => (
          <li key={index}>
            <p><strong>Type:</strong> {exp.type}</p>
            <p><strong>Détail:</strong> {exp.detail}</p>
          </li>
        ))}
      </ul>

      <h3>Expériences Professionnelles</h3>
      <ul>
        {cv.experiencesProfessionnelles.map((exp, index) => (
          <li key={index}>
            <p><strong>Poste:</strong> {exp.poste}</p>
            <p><strong>Entreprise:</strong> {exp.entreprise}</p>
            <p><strong>Missions:</strong> {exp.missions}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/edit-cv')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          background: '#28a745',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        Modifier le CV
      </button>

      <button
        onClick={handleDeleteCv}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          background: '#dc3545',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          marginTop: '10px',
          marginLeft: '10px',
        }}
      >
        Supprimer le CV
      </button>
    </div>
  );
}

export default MyCv;
