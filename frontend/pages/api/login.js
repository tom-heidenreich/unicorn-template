import fetch from "node-fetch"
import clientHash from "../../modules/clienthash"

export default async function handler(req, res) {
    if(req.method != "POST") {
        res.status(405).end("Method not allowed")
        return
    }

    const body = req.body

    const username = body.username
    const password = body.password

    if(!username || !password) {
        res.status(400).end("Missing username or password")
        return
    }

    if(username.length < 3) {
        res.status(400).end("Username must be at least 3 characters long")
        return
    }
    else if(username.length > 20) {
        res.status(400).end("Username must be less than 20 characters long")
        return
    }
    else if(!username.match(/^[a-zA-Z0-9_]+$/)) {
        res.status(400).end("Username must only contain letters, numbers and underscores")
        return
    }
    else if(password.length < 5) {
        res.status(400).end("Password must be at least 5 characters long")
        return
    }
    else if(password.length > 30) {
        res.status(400).end("Password must be less than 30 characters long")
        return
    }
    else if(!password.match(/[0-9]/)) {
        res.status(400).end("Password must contain at least one number")
        return
    }

    try {

        // login
        const apiRes = await fetch(`${process.env.API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "client": clientHash({req, res})
            })
        })

        const json = await apiRes.json()
        if(apiRes.status === 200) {
            // login successful
            res.json(json)
        } else {
            // login failed
            res.status(400).json(json)
        }
    }catch(e) {
        console.log(e)
        res.status(500).end("Internal server error")
    }
}