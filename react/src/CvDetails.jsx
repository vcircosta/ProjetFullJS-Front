import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CvDetails = () => {
  const { id } = useParams(); // Récupère l'ID du CV depuis l'URL
  const [cv, setCv] = useState(null); // Stocke les détails du CV
  const [error, setError] = useState(''); // Message d'erreur
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Récupère le token

    // Vérifie si l'utilisateur est connecté
    if (!token) {
      navigate('/login'); // Redirige vers /login si non connecté
    } else {
      // Récupère les détails du CV
      fetch(`/cvs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token pour l'autorisation
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('CV introuvable.');
          }
          return response.json();
        })
        .then((data) => setCv(data)) // Met à jour l'état avec les données du CV
        .catch((err) => setError(err.message));
    }
  }, [id, navigate]);

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  if (!cv) {
    return <p>Chargement des détails du CV...</p>;
  }

  return (
    <div>
      <h1>{cv.prenom} {cv.nom}</h1>
      <p><strong>Description :</strong> {cv.description}</p>
      <h3>Expériences Pédagogiques :</h3>
      <ul>
        {cv.experiencesPedagogiques.map((exp, index) => (
          <li key={index}>{exp.type} - {exp.detail}</li>
        ))}
      </ul>
      <h3>Expériences Professionnelles :</h3>
      <ul>
        {cv.experiencesProfessionnelles.map((exp, index) => (
          <li key={index}>
            <strong>Poste :</strong> {exp.poste}<br />
            <strong>Entreprise :</strong> {exp.entreprise}<br />
            <strong>Missions :</strong> {exp.missions}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
};

export default CvDetails;
