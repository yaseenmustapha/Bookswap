import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchBar() {
    return (
        <InputGroup size="lg">
            <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            className="rounded-pill"
            />
        </InputGroup>

    );
}

export default SearchBar;