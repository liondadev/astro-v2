import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"

function DashboardNavButtons() {
    return (<Container>
        <h1>Astro</h1>
        <p>Simple Container Management</p>

        <Nav variant="pills" defaultActiveKey="/dash">
        <Nav.Item>
        <Nav.Link href="/dash">Dashboard Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/dash/containers">Containers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        </Nav.Item>
        </Nav>
        <hr />
  </Container>)
}

export default DashboardNavButtons
