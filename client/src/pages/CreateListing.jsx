import React, { useState } from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import S3 from "react-aws-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

function CreateListing() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [condition, setCondition] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [cookies] = useCookies(["jwt"]);
  const [success, setSuccess] = useState(false);
  const awsConfig = {
    bucketName: "gameswap-dev",
    region: "us-west-2",
    accessKeyId: "AKIATVPHJTV5NI4FHSKI",
    secretAccessKey: "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",
  };

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

  const uploadFile = async (file) => {
    console.log("Starting upload");
    const ReactS3Client = new S3(awsConfig);
    // the name of the file uploaded is used to upload it to S3
    try {
      const response = await ReactS3Client.uploadFile(file, file.name);
      const imageUrl = response.location;
      console.log("Uploaded image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.log("File upload error:", error);
      return null;
    }

    /*
     * {
     *   Response: {
     *     bucket: "myBucket",
     *     key: "image/test-image.jpg",
     *     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
     *   }
     * }
     */
  };

  const tryCreateListing = async (e) => {
    e.preventDefault();
    try {
      const responseProfile = await axios.get("/user", {
        headers: { Authorization: `Bearer ${cookies.jwt}` },
      });
      console.log("PROFILE RESPONSE:", responseProfile);
      const userId = responseProfile.data.profile.user_id;

      const imageUrl = await uploadFile(selectedImage);

      const responseCreateListing = await axios.post(
        "/createlisting",
        {
          user_id: userId,
          name: title,
          price: price,
          description: description,
          condition: condition,
          img: [imageUrl],
        },
        { headers: { Authorization: `Bearer ${cookies.jwt}` } }
      );
      console.log("Create listing response: ", responseCreateListing);
      if (responseCreateListing.status === 202) setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.log("Create listing error: ", error);
    }
  };

  return (
    <>
      <Header></Header>
      <Container>
        <Form style={{ paddingTop: "40px" }}>
          <Row>
            <Col md={6}>
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
            </Col>

            <Col md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose an image to upload:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </Form.Group>

              {selectedImage && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button
                    className="btn btn-outline-danger"
                    style={{ marginTop: "15px" }}
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </Col>
          </Row>

          {success && (
            <Alert variant="success">Listing created successfully.</Alert>
          )}

          <Button variant="primary" type="submit" onClick={tryCreateListing}>
            Create listing
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreateListing;
