import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Header from "../Components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import S3 from "react-aws-s3";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Alert,
  AlertIcon,
  InputLeftAddon,
  Select,
  Textarea,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

window.Buffer = window.Buffer || require("buffer").Buffer;

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const awsConfig = {
  bucketName: "gameswap-dev",
  region: "us-west-2",
  accessKeyId: "AKIATVPHJTV5NI4FHSKI",
  secretAccessKey: "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",
};

function CreateListing() {
  const [title, setTitle] = useState();
  const [isbn, setIsbn] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [condition, setCondition] = useState();
  const [images, setImages] = useState(null);
  const [cookies] = useCookies(["jwt"]);
  const [success, setSuccess] = useState(false);

  const handleChangeTitle = (e) => {
    e.preventDefault(); // prevent the default action
    setTitle(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeIsbn = (e) => {
    e.preventDefault(); // prevent the default action
    setIsbn(e.target.value); // set name to e.target.value (event)
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

  const uploadFiles = async (files) => {
    console.log("Starting upload");
    const ReactS3Client = new S3(awsConfig);
    // the name of the file uploaded is used to upload it to S3
    try {
      let imageUrls = [];
      console.log("files", files);
      for (let i = 0; i < files.length; i++) {
        const response = await ReactS3Client.uploadFile(
          files[i].file,
          files[i].filename
        );
        const imageUrl = response.location;
        imageUrls.push(imageUrl);
      }
      return imageUrls;
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
      const userId = responseProfile.data.profile._id;

      const imageUrls = await uploadFiles(images);
      const responseCreateListing = await axios.post(
        "/createlisting",
        {
          user_id: userId,
          name: title,
          isbn: isbn,
          price: price,
          description: description,
          condition: condition,
          img: imageUrls,
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
      <form onSubmit={tryCreateListing} style={{ paddingTop: "30px" }}>
        <SimpleGrid columns={2} spacing={10} px={10}>
          <Box>
            <Stack spacing={4}>
              <FormControl onChange={handleChangeTitle} isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl onChange={handleChangeIsbn} isRequired>
                <FormLabel>ISBN</FormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl onChange={handleChangePrice} isRequired>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input placeholder="00.00" type="text" />
                </InputGroup>
              </FormControl>

              <FormControl onChange={handleChangeCondition} isRequired>
                <FormLabel>Condition</FormLabel>
                <Select placeholder="Select condition">
                  <option value="0">New</option>
                  <option value="1">Like New</option>
                  <option value="2">Used</option>
                  <option value="3">Acceptable</option>
                </Select>
              </FormControl>

              <FormControl onChange={handleChangeDescription}>
                <FormLabel>Description</FormLabel>
                <Textarea />
              </FormControl>

              {success && (
                <Alert status="success">
                  <AlertIcon />
                  Listing created successfully
                </Alert>
              )}

              <Button
                colorScheme="blue"
                type="submit"
                onClick={tryCreateListing}
              >
                Create listing
              </Button>
            </Stack>
          </Box>

          <Box pt={5}>
            <FilePond
              files={images}
              onupdatefiles={setImages}
              allowMultiple={true}
              maxFiles={5}
              acceptedFileTypes={[
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/gif",
              ]}
              instantUpload={false}
              server={null}
              name="files"
              labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
            />
          </Box>
        </SimpleGrid>
      </form>
    </>
  );
}

export default CreateListing;
