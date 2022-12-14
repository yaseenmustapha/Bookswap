import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

const notificationsIcon = <FontAwesomeIcon icon={faBell} size="lg" />;

function Header() {
  const [cookies, , removeCookie] = useCookies(["jwt", "username"]);
  const isAuthenticated = !!cookies.jwt;

  const logout = (e) => {
    removeCookie("jwt", { path: "/" });
    removeCookie("username", { path: "/" });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">GameSwap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link href="#home">Welcome, {cookies.username}</Nav.Link>
                <NavDropdown title={notificationsIcon} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Notification 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Notification 2
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Notification 3
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item className="ml-auto">
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="success"
                    href="/createlisting"
                  >
                    Create listing
                  </Button>
                </Nav.Item>
                <Nav.Item className="ml-auto">
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="outline-danger"
                    href="/"
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <Navbar.Text className="ml-auto">
                <a href="/register">Register</a> or <a href="/login">log in</a>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
