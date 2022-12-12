import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
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
            />
        </InputGroup>

    );
}

export default SearchBar;