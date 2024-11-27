import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyCv() {
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/cvs/mycv', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajoute un token JWT si nécessaire
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('CV introuvable.');
        }
        return response.json();
      })
      .then((data) => setCv(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  if (!cv) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Mon CV</h1>
      <h2>
        {cv.prenom} {cv.nom}
      </h2>
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
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
}

export default MyCv;
