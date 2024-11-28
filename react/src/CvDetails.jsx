import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CvDetails() {
  const { id } = useParams(); // ID du CV depuis les paramètres de l'URL
  const [cv, setCv] = useState(null); // Données du CV
  const [error, setError] = useState(''); // Message d'erreur
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/cvs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le token JWT
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('CV introuvable ou non accessible.');
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
      <h1>{cv.title}</h1> {/* Affiche le titre */}
      <h2>
        {cv.prenom} {cv.nom}
      </h2>
      <p>
        <strong>Description:</strong> {cv.description}
      </p>
      <h3>Expériences Pédagogiques</h3>
      <ul>
        {cv.experiencesPedagogiques.map((exp, index) => (
          <li key={index}>
            <p>
              <strong>Type:</strong> {exp.type}
            </p>
            <p>
              <strong>Détail:</strong> {exp.detail}
            </p>
          </li>
        ))}
      </ul>
      <h3>Expériences Professionnelles</h3>
      <ul>
        {cv.experiencesProfessionnelles.map((exp, index) => (
          <li key={index}>
            <p>
              <strong>Poste:</strong> {exp.poste}
            </p>
            <p>
              <strong>Entreprise:</strong> {exp.entreprise}
            </p>
            <p>
              <strong>Missions:</strong> {exp.missions}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Retour</button>
    </div>
  );
}

export default CvDetails;
