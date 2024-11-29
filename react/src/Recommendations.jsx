import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [cvList, setCvList] = useState([]); // Liste des CVs publics
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationTexts, setRecommendationTexts] = useState({}); // Texte des recommandations par CV
  const userId = localStorage.getItem('userId'); // Utilisateur connecté

  useEffect(() => {
    const fetchPublicCVs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cvs/public', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCvList(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des CVs publics:', err);
        setError('Impossible de récupérer les CVs publics.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicCVs();
  }, []);

  const handleRecommendationChange = (cvId, text) => {
    setRecommendationTexts((prev) => ({ ...prev, [cvId]: text }));
  };

  const handleAddRecommendation = async (cvId) => {
    const text = recommendationTexts[cvId];
    if (!text) {
      alert('Veuillez entrer une recommandation avant de soumettre.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/recommendations',
        {
          cv: cvId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Recommandation ajoutée avec succès.');
      setRecommendationTexts((prev) => ({ ...prev, [cvId]: '' })); // Réinitialiser le champ de texte
    } catch (err) {
      console.error('Erreur lors de l’ajout de la recommandation:', err);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (loading) {
    return <p>Chargement des CVs...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Liste des CVs publics</h2>
      {cvList.length === 0 ? (
        <p>Aucun CV public disponible pour le moment.</p>
      ) : (
        <ul>
          {cvList.map((cv) => (
            <li key={cv._id} style={{ marginBottom: '20px' }}>
              <h3>{cv.title || 'Titre non spécifié'}</h3>
              <p><strong>Nom:</strong> {cv.nom || 'Non spécifié'}</p>
              <p><strong>Prénom:</strong> {cv.prenom || 'Non spécifié'}</p>
              <p><strong>Description:</strong> {cv.description || 'Non spécifiée'}</p>

              {/* Affichage des recommandations associées */}
              <h4>Recommandations :</h4>
              {cv.recommendations?.length > 0 ? (
                <ul>
                  {cv.recommendations.map((rec) => (
                    <li key={rec._id}>
                      <p>{rec.text}</p>
                      <small>
                        Par {rec.fromUser?.username || 'Utilisateur inconnu'} - {new Date(rec.createdAt).toLocaleDateString()}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune recommandation pour ce CV.</p>
              )}

              {/* Formulaire d'ajout de recommandation */}
              <textarea
                placeholder="Écrivez une recommandation ici..."
                value={recommendationTexts[cv._id] || ''}
                onChange={(e) => handleRecommendationChange(cv._id, e.target.value)}
                style={{ width: '100%', height: '80px', marginTop: '10px' }}
              ></textarea>
              <button
                onClick={() => handleAddRecommendation(cv._id)}
                style={{
                  padding: '10px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Ajouter une recommandation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
