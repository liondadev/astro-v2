import useAuthedUser from "../../../hooks/useAuthedUser"

import DashboardLoading from "../../../components/dashboard/DashboardLoading/dashboardloading"
import AuthFailed from "../../../components/auth/AuthFailed/authfailed"
import DashboardNavButtons from "../../../components/dashboard/DashboardNavButtons/dashboardnavbuttons"

import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"

function DashContainerPage() {
    const [authSuccess, authIsLoading, user] = useAuthedUser()
    if (authIsLoading) {
        return <DashboardLoading />
    }

    if (!authSuccess) {
        return <AuthFailed />
    }

    return (<div>
        <DashboardNavButtons />
        <Container>
            <h1>Containers</h1>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Astro Containers</Accordion.Header>
                    <Accordion.Body>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>node:alpine - API</Accordion.Header>
                                <Accordion.Body>
                                    Memory: MEM
                                    Storage: STOR
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>node:alpine - Dashboard</Accordion.Header>
                                <Accordion.Body>
                                    Memory: MEM
                                    Storage: STOR
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>node:alpine - MongoDB</Accordion.Header>
                                <Accordion.Body>
                                    Memory: MEM
                                    Storage: STOR
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Storage And Mesia</Accordion.Header>
                    <Accordion.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>jellyfin - Movies</Accordion.Header>
                                <Accordion.Body>
                                    Memory: MEM
                                    Storage: STOR
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>plex:community - TV And Photos</Accordion.Header>
                                <Accordion.Body>
                                    Memory: MEM
                                    Storage: STOR
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    </div>)
}

export default DashContainerPage
