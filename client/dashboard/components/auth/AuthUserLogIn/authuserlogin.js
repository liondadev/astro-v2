import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { useState } from 'react'
import Router from "next/router"
import axios from "axios"
import Cookies from "universal-cookie"
import { API_URL } from "../../../config/config"

import { toast } from 'react-toastify'

function AuthUserLogInForum() {
    let [ usernameOrEmail, setUsernameOrEmail ] = useState("")
    let [ password, setPassword ] = useState("")

    const cookies = new Cookies()

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const data = {
            usernameOrEmail,
            password
        }

        const submitTo = `${API_URL}/v1/auth/login`

        let submitData = await axios.post(submitTo, data)
            .then((res) => {
                if (!res.data.success && res.data.message) {
                    toast(`⛔ ${res.data.message}`)
                } else if (!res.data.success) {
                    toast(`⛔ An unknown error has occured!`)
                } else {
                    toast(`📌 Login Successfull, please wait while we prepare your session.`)
                    cookies.set("jwt", res.data.token, {
                        path: "/"
                    })
                    console.log(`'JWT' token cookie: ${cookies.get("jwt")}`)
                    // Router.push("/auth/login")
                }
            })
            .catch((err) => {
                if (err.response.data && !err.response.data.success && err.response.data.errorCode) {
                    toast(`⛔ ${err.response.data.message || "An unknown error has occured!"}`)
                } else {
                    toast(`⛔ An unknown error has occured!`)
                }
                console.log(err.response.data)
            })
    }

    return (<div>
        <Card className={"totalcenter shadow"}>
        <Card.Body>
            <Card.Title>Log In</Card.Title>

            <Card.Subtitle>Already have an account, sign in!</Card.Subtitle>

            <Card.Text as="div">If you are having issues loggin in, contact the system administrator for a password reset. If you are the system admin/root user, you can not reset your password.</Card.Text>

            <hr />

            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username Or Email</Form.Label>
                    <Form.Control type="text" placeholder="Username Or Email" onChange={({ currentTarget: { value } }) => setUsernameOrEmail(value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={({ currentTarget: { value } }) => setPassword(value)} />
                </Form.Group>

                <div className={"buttongrid centerflex"}>
                    <Button variant="primary" type="submit" as="button" onClick={handleFormSubmit}>
                        Sign Up
                    </Button>
                </div>
            </Form>
        </Card.Body>
    </Card></div>)
}


export default AuthUserLogInForum
