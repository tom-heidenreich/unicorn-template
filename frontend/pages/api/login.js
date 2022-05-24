export default function handler(req, res) {
    if(req.method != "POST") {
        res.end(405, "Method not allowed")
        return
    }

    const body = req.body

    const username = body.username
    const password = body.password

    if(!username || !password) {
        res.end(400, "Missing username or password")
        return
    }

    if(username.length < 3) {
        res.end(400, "Username must be at least 3 characters long")
        return
    }
    else if(username.length > 20) {
        res.end(400, "Username must be less than 20 characters long")
        return
    }
    else if(!username.match(/^[a-zA-Z0-9_]+$/)) {
        res.end(400, "Username must only contain letters, numbers and underscores")
        return
    }
    else if(password.length < 5) {
        res.end(400, "Password must be at least 5 characters long")
        return
    }
    else if(password.length > 30) {
        res.end(400, "Password must be less than 30 characters long")
        return
    }
    else if(!password.match(/[0-9]/)) {
        res.end(400, "Password must contain at least one number")
        return
    }

    // login
    fetch("http://api:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(async res => {
        if(res.status === 200) {
            // login successful
            const json = await res.json()
            res.json(json)
        } else {
            // login failed
            res.end(400, "Unknown error")
        }
    }).catch(err => {
        console.error(err)
        res.end(500, "Internal server error")
    })
}