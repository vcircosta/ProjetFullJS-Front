import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue sur l'application de gestion des CV</h1>
      <p>Connectez-vous ou inscrivez-vous pour accéder à vos informations.</p>
      <div className="button-group">
        <Link to="/login">
          <button className="btn">Se connecter</button>
        </Link>
        <Link to="/register">
          <button className="btn">S'inscrire</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
