import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { useState } from 'react'
import Router from "next/router"
import axios from "axios"
import { API_URL } from "../../../config/config"

import { toast } from 'react-toastify'

function AuthUserSignUpForum() {
    let [ firstName, setFirstName ] = useState("")
    let [ lastName, setLastName ] = useState("")
    let [ username, setUsername ] = useState("")
    let [ emailAddress, setEmailAddress ] = useState("")
    let [ password, setPassword ] = useState("")

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            username,
            email: emailAddress,
            password
        }

        const submitTo = `${API_URL}/v1/auth/signup`

        let submitData = await axios.post(submitTo, data)
            .then((res) => {
                if (!res.data.success && res.data.message) {
                    toast(`⛔ ${res.data.message}`)
                } else if (!res.data.success) {
                    toast(`⛔ An unknown error has occured!`)
                } else {
                    toast(`📌 Account created successfully! You will be redirected to the login page soon.`)
                    Router.push("/auth/login")
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
            <Card.Title>Sign Up</Card.Title>

            <Card.Subtitle>If you don't have an account, you need to sign up!</Card.Subtitle>

            <Card.Text as="div">Signing up doesn't mean you can access the containers on the server. Ask the root user to grant you access to the containers you need. It is recomended to use a username that the root user will recognise you by.</Card.Text>

            <hr />

            <Form>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={({ currentTarget: { value } }) => setFirstName(value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={({ currentTarget: { value } }) => setLastName(value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmailname">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" onChange={({ currentTarget: { value } }) => setEmailAddress(value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={({ currentTarget: { value } }) => setUsername(value)} />
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


export default AuthUserSignUpForum
