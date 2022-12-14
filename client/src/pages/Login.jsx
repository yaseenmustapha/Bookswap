import React, { useState } from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleChangeUsername = e => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  }

  const handleChangePassword = e => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  }

  function tryLogin() {
      axios.post("/login", {
          username: username,
          password: password
        })
        .then(function (response) {
          console.log('Response: ' + response);
          if (response === 200) navigate("/");
        })
        .catch(function (error) {
          console.log('Error: ' + error);
        });
  }
  

  return (
    <div>
      <Header></Header>
      <Form style={{width: '400px', margin: 'auto', paddingTop: '40px'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} type="username" placeholder="Enter username" onChange={handleChangeUsername} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} type="password" placeholder="Password" onChange={handleChangePassword} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={tryLogin}>
          Log in
        </Button>
      </Form>
    </div>
  );
}

export default Login;
