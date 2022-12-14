import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateListing from './pages/CreateListing';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createlisting" element={<CreateListing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App