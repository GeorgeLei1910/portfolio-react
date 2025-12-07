import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Page from './components/Page/Page';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/programmer" element={<Page occupation='programmer'/>} />
        <Route path="/musician" element={<Page occupation='musician'/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
