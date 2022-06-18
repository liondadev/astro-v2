import useAuthedUser from "../hooks/useAuthedUser"

function IndexPage() {
    let [ success, user, loading ] = useAuthedUser()

    if (loading) {
        return <p>loading...</p>
    }

    if (!success) {
        return <p>Failure</p>
    }

    return <p>{JSON.stringify(user)}</p>
}

export default IndexPage
