import Cookies from 'cookies'

export default async (req, res) => {
    const cookies = new Cookies(req, res)
    const userToken = cookies.get('jwt')

    if (req.method != 'POST') {
        return res.status(501).json({
            success: false,
            errorCode: "invalidMethod",
            message: "This request method is not allowed, use a POST for the time being"
        })
    }

    if (!req.body.key || !userToken || token == "loggedOut") {
        return res.status(200).json({
            success: false,
            errorCode: "notAuthorised",
            message: "You are not logged in!",
            authed: false
        })
    }

    return res.status(200).json({
        success: true,
        authed: true
    })
}
