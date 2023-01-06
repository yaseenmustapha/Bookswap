/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

function YourListings() {
  const [listings, setListings] = useState();
  const [cookies] = useCookies(["jwt", "username"]);
  const isAuthenticated = !!cookies.jwt;

  useEffect(() => {
    const getListingsForCurrentUser = async () => {
      try {
        const responseProfile = await axios.get("/user", {
          headers: { Authorization: `Bearer ${cookies.jwt}` },
        });
        console.log(
          "Get user profile response: ",
          responseProfile.data.profile
        );
        if (responseProfile.status === 200) {
          const user_id = responseProfile.data.profile.user_id;
          const responseListings = await axios.get("/listings", {
            params: { user_id },
          });
          console.log("Listings response", responseListings);
          setListings(responseListings.data);
        }
      } catch (error) {
        console.log("Get user profile error: ", error);
      }
    };

    if (isAuthenticated) {
      getListingsForCurrentUser();
    }
  }, []);

  return (
    <>
      <Text fontSize="2xl" pl={"40px"}>
        Your Listings
      </Text>
      {!listings && (
        <Skeleton isLoaded={listings}>
          <Box h={"300px"} />
        </Skeleton>
      )}

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {!listings && <p>Loading listings...</p>}
        {listings && listings.length === 0 ? (
          <Text fontSize="xl" pl={"40px"}>
            No listings available
          </Text>
        ) : (
          listings &&
          listings.map((listing, i) => (
            <Card maxW="sm">
              <CardBody>
                <Center>
                  <Image
                    src={listing.img[0]}
                    alt={listing.name}
                    borderRadius="lg"
                  />
                </Center>

                <Stack mt="6" spacing="3">
                  <Heading size="md">{listing.name}</Heading>
                  <Text>{listing.description}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    ${Number(listing.price).toFixed(2)}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => {
                      try {
                        const response = axios.get(
                          "/deletelisting",
                          {
                            params: { listing_id: listing.listing_id },
                            headers: { Authorization: `Bearer ${cookies.jwt}` },
                          }
                        );
                        console.log("Delete listing response: ", response);
                        if (response.status === 203) {
                          console.log("Listing successfully deleted");
                        }
                      } catch (error) {
                        console.log("Delete listing error error: ", error);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))
        )}
      </SimpleGrid>
    </>
  );
}

export default YourListings;
