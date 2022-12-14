/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useCookies } from 'react-cookie';

function YourListings() {
  const [data, setData] = useState([])
  const [cookies,] = useCookies(["jwt", "username"]);
  const isAuthenticated = !!cookies.jwt

  useEffect(() => {
    const getListingsForCurrentUser = async () => {
      try {
        const responseProfile = await axios.get("/user", { headers: {Authorization: `Bearer ${cookies.jwt}`}});
        console.log("Get user profile response: ", responseProfile.data.profile);
        if (responseProfile.status === 200) {
          const user_id = responseProfile.data.profile.user_id;
          const responseListings = await axios.get("/listings", { params: {user_id} });
          console.log('Listings response', responseListings)
          setData(responseListings.data)
        }
      } catch (error) {
        console.log("Get user profile error: ", error);
      }
    };
    
    if (isAuthenticated) {
      getListingsForCurrentUser();
    }
  }, [])

    return (
        <Container>
          <h3>Your listings:</h3>
          <Row>
            {!data || data.length === 0 ? (
              <p>No listings available</p>
            ) : (
              data.map((listing, i) => (
                <Col key={i}>
                  <h5 className="text-center">{listing.name}</h5>
                  <img style={{ width: 200, height: 250, display: "block", margin: "auto" }} src={listing.img} alt="Game" />
                  <h6 className="text-center">${Number(listing.price).toFixed(2)}</h6>
                </Col>
              ))
            )}
          </Row>
        </Container>
    );
  }

export default YourListings;

    