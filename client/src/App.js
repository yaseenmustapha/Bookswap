import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import YourListings from './components/YourListings'

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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
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