import React, { useState } from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleChangeUsername = e => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  }

  const handleChangeEmail = e => {
    e.preventDefault(); // prevent the default action
    setEmail(e.target.value); // set name to e.target.value (event)
  }

  const handleChangePassword = e => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  }

  function tryRegister() {
      axios.post("/user", {
          username: username,
          email: email,
          password: password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} type="username" placeholder="Enter email" onChange={handleChangeEmail} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else (except Rather).
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} type="password" placeholder="Password" onChange={handleChangePassword} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={tryRegister}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
