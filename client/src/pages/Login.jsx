import React, { useState } from "react";
import Header from "../Components/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import useAuthCookie from "../Utils/useAuthCookie";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [,setAuthCookie] = useAuthCookie();

  const handleChangeUsername = (e) => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  };

  const handleChangePassword = (e) => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username: username,
        password: password,
      });
      console.log("Login response: ", response);
      if (response.status === 200) {
        setAuthCookie(username, response.data.access_token); // logs in user
        navigate("/");
      }
    } catch (error) {
      console.log("Login error: ", error);
      if (error.response.status === 401) setError(true);
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
          <Alert variant="danger">Username or password is incorrect.</Alert>
        )}

        <Button variant="primary" type="submit" onClick={tryLogin}>
          Log in
        </Button>
      </Form>
    </div>
  );
}

export default Login;
