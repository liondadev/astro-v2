// Gets the user's JWT token from cookies

import Cookies from "cookies"

export default function handler(req, res) {
  const cookies = new Cookies(req, res)
  const token = cookies.get("jwt")

  if (token && token !== "undefined" && token != "loggedOut") {
    res.json({ authed: true, token })
  }
  else {
    res.status(401).json({ authed: false })
  }
}
