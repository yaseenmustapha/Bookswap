import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import YourListings from './components/YourListings'
import SearchBar from './components/SearchBar'

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
      <Header></Header>
      <YourListings></YourListings>
      <div class="row" style={{paddingTop: "50px"}}>
        <div class="col-md-3"></div>
        <div class="col-md-6 col-md-offset-3">
          <SearchBar></SearchBar>
        </div>
        <div class="col-md-3"></div>
      </div>
      
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