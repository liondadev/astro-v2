import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { useState } from 'react'
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
        toast("I was clicked lol bozo raio")

        e.preventDefault()

        const data = {
            firstName,
            lastName,
            username,
            emailAddress,
            password
        }

        const submitTo = `${API_URL}/v1/auth/signup`

        toast(`Submitting to ${submitTo}`)

        let submitData = await axios.post(`${API_URL}/v1/auth/signup`, data)
            .then((res) => {
                /*
                    If there was an error:
                        Switch errorcode:
                            Display error to user with toast
                    If success:
                        Display toast
                        Wait 3 seconds
                        Redirect to login
                */
            })
            .catch((err) => {
                toast("An error occured while submitting this forum! Please try again.")
                console.log(err.message)
            })
    }

    return (<div>
        <Card className={"totalcenter"}>
        <Card.Body>
            <Card.Title>Sign Up</Card.Title>

            <Card.Subtitle>If you don't have an account, you need to sign up!</Card.Subtitle>

            <Card.Text as="div">Signing up doesn't mean you can access the containers on the server. Ask the root user to grant you access to the containers you need. It is recomended to use a username that the root user will recognise you by.</Card.Text>

            <hr />

            <Form>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmailname">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I Agree to share my information with the root user and all administrator of this Astro Instance." />
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
