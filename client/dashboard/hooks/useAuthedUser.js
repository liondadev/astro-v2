import { useEffect, useState } from "react"
import axios from "axios"

useAuthedUser = async () => {
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const [authed, setIsAuthed] = useState(false)

    useEffect(() => {
        const submitTo = `/api/getjwt`

        const data = await axios.get(submitTo)
            .then((res) => {
                if (res.authed) {
                    setIsAuthed(true)
                }
            })
            .catch((err) => {
                setUser({})
                setSuccess(false)
                setIsLoading(false)
                setIsAuthed(false)
            })
    })
}

export default useAuthedUser
