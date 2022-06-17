import axios from 'axios'
import Cookies from 'cookies'

export default (req, res) => {
    const cookies = new Cookies(req, res)
    const userJWT = cookies.get("jwt") || null

    const {requestType, requestURL} = req.body
    if (!req.method != "POST") {
        return res.status(501).json({
            success: false,
            errorCode: "invalidMethod",
            message: "Invalid Request Method, POST is required"
        })
    }

    if (!requestType || !requestURL) {
        return res.status(501).json({
            success: false,
            errorCode: "notEnoughDetails",
            message: "Not enough details were passed. requestType and requestURL need to be padded L bozo + ratio + you're* + nobitches"
        })
    }

    return axios({
        method: requestType,
        url: requestURL,
        data: req.body,
        headers: { authorization: `Bearer ${userJWT}` }
    })
        .then(() => {
            return res.status(200).json({
                success: true
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                errorCode: "invalidRequest",
                message: "Invalid Request!"
            })
        })
}
