/*

    Index / SignIn page
    If the user is already logged in, redirect to the dashboard
    Else, render the sign in page

*/

import AuthHomePage from "../components/auth/AuthHomePage/authhomepage"

function IndexPage() {
    return (
        <AuthHomePage />
    )
}

export default IndexPage
