import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateListing from './pages/CreateListing';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createlisting" element={<CreateListing />} />
      </Routes>
    </div>
  )
}

export default App