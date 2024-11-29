import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Importe la navbar
import AllCVs from './AllCVs';
import Login from './Login';
import Register from './Register';
import Recommendations from './Recommendations';
import MyCv from './MyCv';
import Profile from './Profile';
import CvDetails from './CvDetails';
import EditCv from './EditCv';
import CreateCv from './CreateCv';


function App() {
  return (
    <Router>
      <Navbar /> {/* Ajoute la navbar */}
      <Routes>
        <Route path="/" element={<AllCVs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommendations" element={<Recommendations />} />
       
        <Route path="/profile" element={<Profile />} />
        <Route path="/cv/:id" element={<CvDetails />} />
        <Route path="/mycv" element={<MyCv />} />
        <Route path="/edit-cv" element={<EditCv />} />
        <Route path="/create-cv" element={<CreateCv />} />

      </Routes>
    </Router>
  );
}

export default App;
