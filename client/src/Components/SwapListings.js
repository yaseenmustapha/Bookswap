/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Hooks/useAuth";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { conditionAdapter } from "../Utils";

function SwapListings({ swapWithListing }) {
  const [listings, setListings] = useState();
  const { isAuthenticated, currentUser, token } = useAuth();

  useEffect(() => {
    const getListingsForCurrentUser = async () => {
      try {
        const responseProfile = await axios.get(
          process.env.REACT_APP_API_BASE + "/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(
          "Get user profile response: ",
          responseProfile.data.profile
        );
        if (responseProfile.status === 200) {
          const user_id = responseProfile.data.profile._id;
          const responseListings = await axios.get(
            process.env.REACT_APP_API_BASE + "/listings",
            {
              params: { user_id },
            }
          );
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
      {!listings && (
        <Skeleton isLoaded={listings}>
          <Box h={"100px"} />
        </Skeleton>
      )}

      <Stack pt="8" w="100%" spacing="4">
        {!listings && <p>Loading listings...</p>}
        {listings && listings.length === 0 ? (
          <Text fontSize="xl" pl={"40px"}>
            No listings available
          </Text>
        ) : (
          listings &&
          listings.map((listing, i) => (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              key={i}
            >
              {listing.img && (
                <Image
                  src={listing.img[0]}
                  alt={listing.title}
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                />
              )}
              <CardBody>
                <Heading size="md">{listing.title}</Heading>
                <Text>ISBN: {listing.isbn}</Text>
                <Text>Condition: {conditionAdapter(listing.condition)}</Text>
                <Text>{listing.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  ${Number(listing.price).toFixed(2)}
                </Text>
              </CardBody>

              <CardFooter>
                <HStack>
                  <Button
                    leftIcon={<RepeatIcon />}
                    variant="solid"
                    colorScheme="green"
                    onClick={() =>
                      window.open(
                        `mailto:${swapWithListing.email}?subject=Bookswap%20🔄:%20Interested%20in%20swapping%20${listing.title}%20for%20${swapWithListing.title}&body=Hi%2C%0A%0AI%20am%20interested%20in%20swapping%20my%20book%20${listing.title}%20(ISBN%3A%20${listing.isbn})%20for%20your%20book%20${swapWithListing.title}%20(ISBN%3A%20${swapWithListing.isbn}).%20Please%20let%20me%20know%20if%20you%20would%20like%20to%20move%20forward%20with%20the%20trade!%0A%0AThe%20best%2C%0A${currentUser}`,
                        "_blank"
                      )
                    }
                  >
                    Swap
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))
        )}
      </Stack>
    </>
  );
}

export default SwapListings;
