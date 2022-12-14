import React, { useState } from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

function CreateListing() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [condition, setCondition] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChangeTitle = (e) => {
    e.preventDefault(); // prevent the default action
    setTitle(e.target.value); // set name to e.target.value (event)
  };

  const handleChangePrice = (e) => {
    e.preventDefault(); // prevent the default action
    setPrice(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeDescription = (e) => {
    e.preventDefault(); // prevent the default action
    setDescription(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeCondition = (e) => {
    e.preventDefault(); //prevent the default action
    setCondition(e.target.value); //set name to e.target.value (event)
  };

  function tryCreateListing() {
    axios
      .post("/createlisting", {
        name: title,
        price: price,
        description: description,
        condition: condition,
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
      <Form style={{ width: "600px", paddingLeft: "40px", paddingTop: "40px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            placeholder="Enter title"
            onChange={handleChangeTitle}
          />
          <Form.Text className="text-muted">
            Enter a descriptive title.
          </Form.Text>
        </Form.Group>

        <Form.Group
          style={{ width: "150px" }}
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>

            <Form.Control
              value={price}
              placeholder="00.00"
              onChange={handleChangePrice}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Condition</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeCondition}
            aria-label="Select condition of game"
          >
            <option value="0">New</option>
            <option value="1">Like New</option>
            <option value="2">Used</option>
            <option value="3">Acceptable</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            as="textarea"
            placeholder="Enter a description"
            onChange={handleChangeDescription}
          />
        </Form.Group>

        {selectedImage && (
        <div>
        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}

<input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />

        <Button variant="primary" type="submit" onClick={tryCreateListing}>
          Create listing
        </Button>
      </Form>
    </div>
  );
}

export default CreateListing;
