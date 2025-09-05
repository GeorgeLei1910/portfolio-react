import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/programmer" element={<Homepage />} />
        <Route path="/musician" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
