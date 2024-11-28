import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CvDetails() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/cvs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('CV introuvable.');
        }
        return response.json();
      })
      .then((data) => setCv(data))
      .catch((err) => setError(err.message));
  }, [id]);

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
      <h1>
        {cv.prenom} {cv.nom}
      </h1>
      <p><strong>Description:</strong> {cv.description}</p>

      <h2>Expériences Pédagogiques</h2>
      <ul>
        {cv.experiencesPedagogiques.map((exp, index) => (
          <li key={index}>
            <p><strong>Type:</strong> {exp.type}</p>
            <p><strong>Détail:</strong> {exp.detail}</p>
          </li>
        ))}
      </ul>

      <h2>Expériences Professionnelles</h2>
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

export default CvDetails;
