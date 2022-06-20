import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

function AuthHomePage() {
    return (<Card className={"totalcenter"}>
        <Card.Body>
            <Card.Title>Authenticate</Card.Title>
            <Card.Subtitle>
                To access the dashboard, you need to authenticate.
            </Card.Subtitle>

            <Card.Text as="div">
                If you register an account, you must ask the server's root user to give your account access to the VMs it needs. <strong>If you stumbled on this login by acident, there is no reason for you to sign up.</strong><br></br><center>~ The Astro Team</center>
            </Card.Text>

            <div className="buttongrid centerflex">
                <Button>Log Into Existing Account</Button>
                <Button variant="outline-secondary">Create An Account</Button>
            </div>
        </Card.Body>

    </Card>)
}

export default AuthHomePage
