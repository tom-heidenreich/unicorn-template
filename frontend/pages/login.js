import { Text, TextInput, Title, Container, Space, Button, PasswordInput, LoadingOverlay } from "@mantine/core"
import { Lock, User } from "tabler-icons-react"
import { useState } from "react"

export default function LoginPage() {

    const [session, setSession] = useState(null)

    return (
        <Text>
            <Title align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt={100}>
                Login
            </Title>
            <Space h="xl" />
            <Container sx={{ maxWidth: 400 }} >
                {session === null ?
                    <SignIn setSession={setSession} /> :
                    <Text>You are logged in! Session: {session}</Text>
                }
            </Container>
        </Text>
    )
}

function SignIn({setSession}) {

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState({"data": "", "error": ""})
    const [password, setPassword] = useState({"data": "", "error": ""})

    function handleUsernameChange(e) {
        setUsername({"data": e.target.value})
    }

    function handlePasswordChange(e) {
        setPassword({"data": e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        // check if username and password are valid
        if(username.data.length < 3) setUsername({"error": "Username must be at least 3 characters long", "data": username.data})
        else if(username.data.length > 20) setUsername({"error": "Username must be less than 20 characters long", "data": username.data})
        else if(!username.data.match(/^[a-zA-Z0-9_]+$/)) setUsername({"error": "Username must only contain letters, numbers and underscores", "data": username.data})
        else if(password.data.length < 3) setPassword({"error": "Password must be at least 3 characters long", "data": password.data})
        else if(password.data.length > 30) setPassword({"error": "Password must be less than 30 characters long", "data": password.data})
        else if(!password.data.match(/[0-9]/)) setPassword({"error": "Password must contain at least one number", "data": password.data})
        else {
            setLoading(true)
            // login
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username.data,
                    "password": password.data
                })
            }).then(async res => {
                if(res.status === 200) {
                    // login successful
                    const json = await res.json()
                    setSession(json.sessionId)
                } else {
                    // login failed
                    setUsername({"error": "Unknown error", "data": username.data})
                    setPassword({"error": "Unknown error", "data": password.data})
                }
                setLoading(false)
            }).catch(err => {
                console.error(err)
                setLoading(false)
            })
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <TextInput
                icon={<User size={16} />}
                label="Enter Username:"
                description="Username must be between 3 and 20 characters long"
                error={username.error}
                placeholder="Your Username"
                onChange={handleUsernameChange}
            />
            <Space h="sm" />
            <PasswordInput
                icon={<Lock size={16} />}
                label="Enter Password:"
                description="Password must be at least 5 characters long and contain at least 1 number"
                error={password.error}
                placeholder="Your Password"
                onChange={handlePasswordChange}
            />
            <Space h="xl" />
            <Button
                onClick={handleSubmit}
            >
                Sign in
            </Button>
        </>
    )
}