import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateListing from './Pages/CreateListing';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';

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