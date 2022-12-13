import React from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Register() {
    function tryRegister() {
        axios.post("/user", {
            username: "Fred",
            password: "Flintstone"
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else (except Rather).
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={tryRegister}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
