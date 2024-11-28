import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCv() {
  const [title, setTitle] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [experiencesPedagogiques, setExperiencesPedagogiques] = useState([
    { type: '', detail: '' },
  ]);
  const [experiencesProfessionnelles, setExperiencesProfessionnelles] = useState([
    { poste: '', entreprise: '', missions: '' },
  ]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const cvData = {
      title,
      nom,
      prenom,
      description,
      visibility,
      experiencesPedagogiques,
      experiencesProfessionnelles,
    };

    fetch('/cvs/mycv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(cvData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la création du CV.');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('CV créé avec succès!');
        setTimeout(() => navigate('/mycv'), 2000); // Redirige après 2 secondes
      })
      .catch((err) => setError(err.message));
  };

  // Ajouter une expérience pédagogique
  const addPedagogique = () => {
    setExperiencesPedagogiques([
      ...experiencesPedagogiques,
      { type: '', detail: '' },
    ]);
  };

  // Supprimer une expérience pédagogique
  const removePedagogique = (index) => {
    if (experiencesPedagogiques.length > 1) {
      setExperiencesPedagogiques(
        experiencesPedagogiques.filter((_, i) => i !== index)
      );
    }
  };

  // Ajouter une expérience professionnelle
  const addProfessionnelle = () => {
    setExperiencesProfessionnelles([
      ...experiencesProfessionnelles,
      { poste: '', entreprise: '', missions: '' },
    ]);
  };

  // Supprimer une expérience professionnelle
  const removeProfessionnelle = (index) => {
    if (experiencesProfessionnelles.length > 1) {
      setExperiencesProfessionnelles(
        experiencesProfessionnelles.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div>
      <h1>Créer un CV</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Visibilité:</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
        </div>

        <h3>Expériences Pédagogiques</h3>
        {experiencesPedagogiques.map((exp, index) => (
          <div key={index}>
            <select
              value={exp.type}
              onChange={(e) =>
                setExperiencesPedagogiques(
                  experiencesPedagogiques.map((item, i) =>
                    i === index ? { ...item, type: e.target.value } : item
                  )
                )
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
                setExperiencesPedagogiques(
                  experiencesPedagogiques.map((item, i) =>
                    i === index ? { ...item, detail: e.target.value } : item
                  )
                )
              }
              required
            />
            <button type="button" onClick={() => removePedagogique(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addPedagogique}>
          Ajouter une expérience pédagogique
        </button>

        <h3>Expériences Professionnelles</h3>
        {experiencesProfessionnelles.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Poste"
              value={exp.poste}
              onChange={(e) =>
                setExperiencesProfessionnelles(
                  experiencesProfessionnelles.map((item, i) =>
                    i === index ? { ...item, poste: e.target.value } : item
                  )
                )
              }
              required
            />
            <input
              type="text"
              placeholder="Entreprise"
              value={exp.entreprise}
              onChange={(e) =>
                setExperiencesProfessionnelles(
                  experiencesProfessionnelles.map((item, i) =>
                    i === index ? { ...item, entreprise: e.target.value } : item
                  )
                )
              }
              required
            />
            <textarea
              placeholder="Missions"
              value={exp.missions}
              onChange={(e) =>
                setExperiencesProfessionnelles(
                  experiencesProfessionnelles.map((item, i) =>
                    i === index ? { ...item, missions: e.target.value } : item
                  )
                )
              }
              required
            />
            <button type="button" onClick={() => removeProfessionnelle(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addProfessionnelle}>
          Ajouter une expérience professionnelle
        </button>

        <div style={{ marginTop: '20px' }}>
          <button type="submit">Créer le CV</button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ marginLeft: '10px' }}
          >
            Retour à l'accueil
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCv;
