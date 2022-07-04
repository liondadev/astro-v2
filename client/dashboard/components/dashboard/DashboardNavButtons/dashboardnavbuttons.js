import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"

function DashboardNavButtons() {
    return (<Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/dash">
        Astro Containers
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dash">Home</Nav.Link>
            <Nav.Link href="/dash/containers">Containers</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/dash/settings">Astro Settings</NavDropdown.Item>
              <NavDropdown.Item href="/dash/settings/user">User Settings</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>)
}

export default DashboardNavButtons
