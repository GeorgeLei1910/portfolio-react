import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Programmer from './components/Programmer/Programmer';
import Musician from './components/Musician/Musician';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/programmer" element={<Programmer />} />
        <Route path="/musician" element={<Musician />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
