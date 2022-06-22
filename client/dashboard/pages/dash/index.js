import useJWTToken from "../../hooks/useJWTToken"

function DashIndexPage() {
    const [success, loading, authed, token] = useJWTToken()

    return <div>Success: {success.toString()} || Loading: {loading.toString()} || Authed: {authed.toString()} || Token: {token}</div>
}

export default DashIndexPage
