import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar() {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault(); // prevent the default action
    setSearch(e.target.value); // set name to e.target.value (event)
  };

  const trySearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE + "/searchlistings", {
        params: { search_term: search },
      });
      console.log("search result: ", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log("search error: ", error);
    }
  };

  return (
    <>
      <form onSubmit={trySearch}>
        <FormControl onChange={handleSearch}>
          <Center>
            <InputGroup size={"lg"} w={"50%"}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Search for a book..." />
            </InputGroup>
          </Center>
        </FormControl>
      </form>
      <Center>
        <Stack pt="8" w="70%" spacing="4">
          {searchResults &&
            searchResults.length !== 0 &&
            searchResults.map((searchResult, i) => (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                key={i}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={searchResult.img}
                  alt={searchResult.title}
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{searchResult.title}</Heading>
                    <Text>ISBN: {searchResult.isbn}</Text>
                    <Text fontSize="2xl" py="2">
                      ${searchResult.price}
                    </Text>
                    <Text>Seller: {searchResult.username}</Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      View listing
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            ))}
        </Stack>
      </Center>
    </>
  );
}

export default SearchBar;
