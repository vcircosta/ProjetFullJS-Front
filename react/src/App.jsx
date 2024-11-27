import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllCVs from './AllCVs';
import Register from './Register';
import Login from './Login';
import MyCv from './MyCv';
import CvDetails from './CvDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllCVs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mycv" element={<MyCv />} />
        <Route path="/cv/:id" element={<CvDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
