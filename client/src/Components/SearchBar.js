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
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RepeatIcon, SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "../Hooks/useAuth";
import SwapListings from "./SwapListings";
import { conditionAdapter } from "../Utils";

function SearchBar() {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const { isAuthenticated, currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (e) => {
    e.preventDefault(); // prevent the default action
    setSearch(e.target.value); // set name to e.target.value (event)
  };

  const trySearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE + "/searchlistings",
        {
          params: { search_term: search },
        }
      );
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
            <InputGroup size={"lg"} width={["90%", "70%", "70%", "50%"]}>
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
            searchResults.map(
              (searchResult, i) =>
                searchResult.username !== currentUser && (
                  <>
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
                          <Text>
                            Condition:{" "}
                            {conditionAdapter(searchResult.condition)}
                          </Text>
                          <Text color="blue.600" fontSize="2xl" py="2">
                            ${Number(searchResult.price).toFixed(2)}
                          </Text>
                          <Text>Seller: {searchResult.username}</Text>
                        </CardBody>

                        <CardFooter>
                          <HStack>
                            {/* <Button variant="solid" colorScheme="blue">
                                  // View listing
                                </Button> */}
                            <Button
                              leftIcon={<RepeatIcon />}
                              variant="solid"
                              colorScheme="blue"
                              onClick={onOpen}
                              disabled={!isAuthenticated}
                            >
                              Swap
                            </Button>
                            <Button
                              leftIcon={<Text>$</Text>}
                              variant="solid"
                              colorScheme="green"
                              onClick={() =>
                                window.open(
                                  `mailto:${
                                    searchResult.email
                                  }?subject=Bookswap%20💲:%20Interested%20in%20buying%20${
                                    searchResult.title
                                  }&body=Hi%2C%0A%0AI%20am%20interested%20in%20purchasing%20your%20book%20${
                                    searchResult.title
                                  }%20(ISBN%3A%20${
                                    searchResult.isbn
                                  }).%20Please%20let%20me%20know%20if%20you%20would%20like%20to%20move%20forward!${
                                    isAuthenticated
                                      ? `%0A%0AThe%20best%2C%0A${currentUser}`
                                      : ""
                                  }`,
                                  "_blank"
                                )
                              }
                            >
                              Buy
                            </Button>
                          </HStack>
                        </CardFooter>
                      </Stack>
                    </Card>

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent maxW="80%">
                        <ModalHeader>
                          Which book would you like to trade?
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <SwapListings swapWithListing={searchResult} />
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                )
            )}
        </Stack>
      </Center>
    </>
  );
}

export default SearchBar;
