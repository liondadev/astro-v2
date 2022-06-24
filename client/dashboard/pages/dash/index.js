import useJWTToken from "../../hooks/useJWTToken"
import useAuthedUser from "../../hooks/useAuthedUser"

import DashboardLoading from "../../components/dashboard/DashboardLoading/dashboardloading"
import AuthFailed from "../../components/auth/AuthFailed/authfailed"
import DashboardNavButtons from "../../components/dashboard/DashboardNavButtons/dashboardnavbuttons"

import Container from "react-bootstrap/Container"

function DashIndexPage() {
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
            <h1>Welcome to your Astro Dashboard.</h1>
            <p>Here you can <a href="/dash/containers">Manage Your Containers</a>, Manage Roles & Users, and check up on your install.</p>
        </Container>
    </div>)
}

export default DashIndexPage
