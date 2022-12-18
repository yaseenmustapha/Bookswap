import React, { useState } from "react";
import Header from "../Components/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import useAuthCookie from "../Utils/useAuthCookie";

function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [,setAuthCookie] = useAuthCookie();

  const handleChangeUsername = (e) => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeEmail = (e) => {
    e.preventDefault(); // prevent the default action
    setEmail(e.target.value); // set name to e.target.value (event)
  };

  const handleChangePassword = (e) => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  };

  const tryRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user", {
        username: username,
        email: email,
        password: password,
      });
      console.log("Register response: ", response)
      if (response.status === 201) {
        setAuthCookie(username, response.data.access_token); // logs in user
        navigate("/");
      }
    } catch (error) {
      console.log("Register error: ", error);
      if (error.response.status === 409) setError(true);
    }
  };

  return (
    <div>
      <Header></Header>
      <Form style={{ width: "400px", margin: "auto", paddingTop: "40px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            type="username"
            placeholder="Enter username"
            onChange={handleChangeUsername}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="username"
            placeholder="Enter email"
            onChange={handleChangeEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else (except Rather).
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
        </Form.Group>

        {error && (
          <Alert variant="danger">User already exists.</Alert>
        )}

        <Button variant="primary" type="submit" onClick={tryRegister}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
