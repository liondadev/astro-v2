import axios from 'axious'
import { useEffect, useState } from 'react'
import { apiBaseURL } from '../config/config'

export default function useAuthedUser() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    // TODO: Get cookies, add the auth header
    let token

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    token = getCookie("jwt")

    if (!token) {
        setUser(null)
        setSuccess(false)
        setLoading(false)
        return [ success, user, loading ]
    }

    useEffect(() => {
        return axios({
            url: `${apiBaseURL}/v1/auth/me`,
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
            method: 'POST'
        })
            .then((res) => {
                if (!res.data || !res.data.success || !res.data.data || !res.data.data.user) {
                    setUser(null)
                    setSuccess(false)
                    setLoading(false)
                } else {
                    setUser(res.data.data.user)
                    setSuccess(true)
                    setLoading(false)
                }
            })
    }, [url])


    return [ success, user, loading ]
}
