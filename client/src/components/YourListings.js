import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function YourListings() {
    return (
        <Container>
          <Row>
            <Col>Witcher 3</Col>
            <Col><p className="text-center" >Witcher 3</p></Col>
          </Row>
          <Row>
            <Col  xs={12} sm={20} md={5}><img style={{ width: 200, height: 250 }} src="https://www.giantbomb.com/a/uploads/scale_medium/0/3699/2945734-the%20witcher%203%20-%20wild%20hunt.jpg" alt="React Image" /> </Col>
            <Col><img style={{ width: 200, height: 250 }} src="https://www.giantbomb.com/a/uploads/scale_medium/0/3699/2945734-the%20witcher%203%20-%20wild%20hunt.jpg" alt="React Image" /> </Col>
          </Row>
            <br></br>
            <br></br>
          <Row>
            <Col><img style={{ width: 200, height: 250 }} src="https://www.giantbomb.com/a/uploads/scale_medium/0/3699/2945734-the%20witcher%203%20-%20wild%20hunt.jpg" alt="React Image" /> </Col>
            <Col><img style={{ width: 200, height: 250 }} src="https://www.giantbomb.com/a/uploads/scale_medium/0/3699/2945734-the%20witcher%203%20-%20wild%20hunt.jpg" alt="React Image" /> </Col>
          </Row>
        </Container>
    );
  }

export default YourListings;

    