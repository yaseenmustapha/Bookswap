import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

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
            const response = await axios.get("/searchlistings", { params: {search_term: search} });
            console.log("search result: ", response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.log("search error: ", error);
        }
    }
    
    return (
        <Container>
            <div className="d-flex justify-content-center">
                <Form onSubmit={trySearch} className="col-md-8">
                    <InputGroup size="lg">
                        <InputGroup.Text style={{color: "#676869", border:"none", backgroundColor:"white"}}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            className="rounded-pill"
                            placeholder="Search for a game..."
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Form>
            </div>
            {
                searchResults && searchResults.length !== 0 && searchResults.map((searchResult, i) => (
                    <Row key={i}>
                        <Col className="col-md-4">
                            <img style={{ width: 200 }} src={searchResult.img}></img>
                        </Col>
                        <Col className="col-md-8">
                            <h3>{searchResult.name}</h3>
                            <h4><em>${searchResult.price}</em></h4>
                            <p>Seller: {searchResult.username}</p>
                        </Col>
                    </Row>
                ))
            }
        </Container>
    );
}

export default SearchBar;