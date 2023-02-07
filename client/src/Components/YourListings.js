/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Hooks/useAuth";
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
  const {isAuthenticated, token} = useAuth();
  const [listingDeleted, setListingDeleted] = useState(false);

  useEffect(() => {
    const getListingsForCurrentUser = async () => {
      try {
        const responseProfile = await axios.get(process.env.REACT_APP_API_BASE + "/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(
          "Get user profile response: ",
          responseProfile.data.profile
        );
        if (responseProfile.status === 200) {
          const user_id = responseProfile.data.profile._id;
          const responseListings = await axios.get(process.env.REACT_APP_API_BASE + "/listings", {
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
    if (listingDeleted) {
      setListingDeleted(false);
    }
  }, [listingDeleted]);

  const deleteListing = listingId => async e => {
    e.preventDefault();
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE + "/deletelisting",
        {
          params: { listing_id: listingId.$oid },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Delete listing response: ", response);
      if (response.status === 203) {
        setListingDeleted(true);
        console.log("Listing successfully deleted");
      }
    } catch (error) {
      console.log("Delete listing error error: ", error);
    }
  }

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
        paddingInline={10}
      >
        {!listings && <p>Loading listings...</p>}
        {listings && listings.length === 0 ? (
          <Text fontSize="xl" pl={"40px"}>
            No listings available
          </Text>
        ) : (
          listings &&
          listings.map((listing, i) => (
            <Card maxW="xs" key={i}>
              <CardBody>
                <Center>
                  {listing.img && (
                    <Image
                      src={listing.img[0]}
                      alt={listing.title}
                      borderRadius="lg"
                    />
                  )}
                </Center>

                <Stack mt="6" spacing="3">
                  <Heading size="md">{listing.title}</Heading>
                  <Text>ISBN: {listing.isbn}</Text>
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
                    onClick={deleteListing(listing._id)}
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
