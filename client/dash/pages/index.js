/*
    This is the index page, the only thing it is used for is verifying that the user is signed in
    If they are not, they will be redirected to the login page.
    If they are, they will be redirected to the dashboard page.
*/

export async function getServerSideProps({ res, params }) {
    res.statusCode = 302
    res.setHeader('Location', '/dashboard')
    return { props: {} }
}

function IndexPage() {
    return (
        <div>
            <h3>Please wait to be redirected</h3>
            <p>If nothing happens, go to <a href='/dashboard'>/dashboard</a> or <a href='/login'>/login</a> respectiveally.</p>
        </div>
    )
}

export default IndexPage
