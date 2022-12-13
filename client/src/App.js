import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import YourListings from './components/YourListings'
import SearchBar from './components/SearchBar'
import Login from './pages/Login';

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      <div class="row" style={{paddingTop: "50px", paddingBottom: "50px"}}>
        <div class="col-md-3"></div>
        <div class="col-md-6 col-md-offset-3">
          <SearchBar></SearchBar>
        </div>
        <div class="col-md-3"></div>
      </div>
      <YourListings></YourListings>
      
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
      
    </div>
  )
}

export default App