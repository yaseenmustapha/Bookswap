import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function YourListings() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/listings").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

    return (
        <Container>
          <h3>Your listings:</h3>
          <Row>
            {(typeof data.listings === 'undefined') ? (
              <p>Loading listings...</p>
            ) : (
              data.listings.map((listing, i) => (
                <Col key={i}>
                  <p className="text-center">{listing.name}</p>
                  <img style={{ width: 200, height: 250, display: "block", margin: "auto" }} src={listing.img} alt="Game" />
                </Col>
              ))
            )}
          </Row>
        </Container>
    );
  }

export default YourListings;

    