import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditCv() {
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Charger les données existantes du CV
  useEffect(() => {
    fetch('/cvs/mycv', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du CV.');
        }
        return response.json();
      })
      .then((data) => {
        setCv(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Gérer la soumission du formulaire pour mettre à jour le CV
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/cvs/mycv', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(cv),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour du CV.');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('CV mis à jour avec succès.');
        setTimeout(() => navigate('/mycv'), 2000); // Redirige vers "Mon CV" après 2 secondes
      })
      .catch((err) => setError(err.message));
  };

  // Mettre à jour les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCv({ ...cv, [name]: value });
  };

  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...cv[field]];
    updatedArray[index][key] = value;
    setCv({ ...cv, [field]: updatedArray });
  };

  const addArrayItem = (field, item) => {
    setCv({ ...cv, [field]: [...cv[field], item] });
  };

  const removeArrayItem = (field, index) => {
    if (cv[field].length > 1) {
      const updatedArray = cv[field].filter((_, i) => i !== index);
      setCv({ ...cv, [field]: updatedArray });
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!cv) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Modifier le CV</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            name="title"
            value={cv.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={cv.nom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={cv.prenom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={cv.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Visibilité:</label>
          <select
            name="visibility"
            value={cv.visibility}
            onChange={handleInputChange}
          >
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
        </div>

        <h3>Expériences Pédagogiques</h3>
        {cv.experiencesPedagogiques.map((exp, index) => (
          <div key={index}>
            <select
              value={exp.type}
              onChange={(e) =>
                handleArrayChange('experiencesPedagogiques', index, 'type', e.target.value)
              }
              required
            >
              <option value="">Sélectionnez</option>
              <option value="Diplôme">Diplôme</option>
              <option value="Certification">Certification</option>
              <option value="Formation">Formation</option>
            </select>
            <input
              type="text"
              placeholder="Détail"
              value={exp.detail}
              onChange={(e) =>
                handleArrayChange('experiencesPedagogiques', index, 'detail', e.target.value)
              }
              required
            />
            <button type="button" onClick={() => removeArrayItem('experiencesPedagogiques', index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('experiencesPedagogiques', { type: '', detail: '' })}>
          Ajouter une expérience pédagogique
        </button>

        <h3>Expériences Professionnelles</h3>
        {cv.experiencesProfessionnelles.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Poste"
              value={exp.poste}
              onChange={(e) =>
                handleArrayChange('experiencesProfessionnelles', index, 'poste', e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Entreprise"
              value={exp.entreprise}
              onChange={(e) =>
                handleArrayChange('experiencesProfessionnelles', index, 'entreprise', e.target.value)
              }
              required
            />
            <textarea
              placeholder="Missions"
              value={exp.missions}
              onChange={(e) =>
                handleArrayChange('experiencesProfessionnelles', index, 'missions', e.target.value)
              }
              required
            />
            <button type="button" onClick={() => removeArrayItem('experiencesProfessionnelles', index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('experiencesProfessionnelles', { poste: '', entreprise: '', missions: '' })}>
          Ajouter une expérience professionnelle
        </button>

        <div style={{ marginTop: '20px' }}>
          <button type="submit">Enregistrer les modifications</button>
          <button
            type="button"
            onClick={() => navigate('/mycv')}
            style={{ marginLeft: '10px' }}
          >
            Retour à Mon CV
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCv;
