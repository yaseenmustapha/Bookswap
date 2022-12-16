import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function SearchBar() {
    const [search, setSearch] = useState();

    const handleSearch = (e) => {
        e.preventDefault(); // prevent the default action
        setSearch(e.target.value); // set name to e.target.value (event)
      };

    const trySearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/searchlistings?search_term=${search}`, {
                search: search,
            });
            handleSearch(response);
            console.log("search result: ", response);
        } catch (error) {
            console.log("search error: ", error);
        }
    }
    
    return (
        <InputGroup size="lg">
            <InputGroup.Text style={{color: "#676869", border:"none", backgroundColor:"white"}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                className="rounded-pill"
                placeholder="Search for a game..."
                onKeyUp={trySearch}
            />
        </InputGroup>

    );
}

export default SearchBar;