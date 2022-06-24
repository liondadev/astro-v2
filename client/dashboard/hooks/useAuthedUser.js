import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../config/config"

const useAuthedUser = () => {
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const submitTo = `${API_URL}/v1/auth/me`

        const data = axios.get(submitTo, {
            withCredentials: true
        })
            .then((res) => {
                if (res.data.success) {
                    setIsLoading(false)
                    setSuccess(true)
                    setUser(res.data.data.user) // data data user - very simple
                } else {
                    setIsLoading(false)
                    setSuccess(false)
                }
            })
            .catch((err) => {
                console.log(`Error with useAuthedUser: ${err.message}`)
                setSuccess(false)
                setIsLoading(false)
            })
    }, [])

    return [success, loading, user]
}

export default useAuthedUser
