import { useEffect, useState } from "react"
import axios from "axios"

const useJWTToken = () => {
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const [authed, setIsAuthed] = useState(false)

    useEffect(() => {
        const submitTo = `/api/getjwt`

        const data = axios.get(submitTo, {
            withCredentials: true
        })
            .then((res) => {
                if (res.data.authed) {
                    setIsAuthed(true)
                    setIsLoading(false)
                    setSuccess(true)
                    setToken(res.data.token)
                } else {
                    setIsAuthed(false)
                    setIsLoading(false)
                    setSuccess(true)
                }
            })
            .catch((err) => {
                console.log(err.message)
                setSuccess(false)
                setIsLoading(false)
                setIsAuthed(false)
            })
    }, [])

    return [success, loading, authed, token]
}

export default useJWTToken
