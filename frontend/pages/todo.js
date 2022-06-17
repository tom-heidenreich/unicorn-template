import { TextInput, Title, Container, Space, Button, PasswordInput, LoadingOverlay, Stack, Text } from "@mantine/core"
import { Check, Lock, User, Edit } from "tabler-icons-react"
import { useEffect, useState } from "react"
import { useDebouncedValue, useFocusTrap } from "@mantine/hooks"
import { v4 as uuidv4 } from 'uuid';
import { getSession } from "../modules/session"

export default function LoginPage({ preloaded_session }) {

    const [session, setSession] = useState(preloaded_session)

    return (
        <Container sx={{ maxWidth: 400}} >
            {!session ?
                <SignIn setSession={setSession} /> :
                <SignedIn session={session} />
            }
        </Container>
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
                    console.log(json);
                    setSession(json)
                } else {
                    const text = await res.text()
                    // login failed
                    setUsername({"error": text, "data": username.data})
                    setPassword({"error": text, "data": password.data})
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
            <Title align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt={100}>
                Login
            </Title>
            <Space h="xl" />
            <LoadingOverlay visible={loading} />
            <TextInput
                icon={<User size={16} />}
                label="Enter Username:"
                description="Username must be between 3 and 20 characters long"
                error={username.error}
                placeholder="Your Username"
                onChange={handleUsernameChange}
                name="username"
            />
            <Space h="sm" />
            <PasswordInput
                icon={<Lock size={16} />}
                label="Enter Password:"
                description="Password must be at least 5 characters long and contain at least 1 number"
                error={password.error}
                placeholder="Your Password"
                onChange={handlePasswordChange}
                name="password"
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

function SignedIn({session}) {

    const [list, setList] = useState([])

    const [editable, setEditable] = useState(null)

    const [debounced] = useDebouncedValue(list, 2000)
    const [status, setStatus] = useState('idle')

    function updateSession() {
        console.log(session);
        fetch("/api/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "todo": list,
                'session_id': session.id,
                'user': session.id
            })
        }).then(async res => {
            if(res.status === 200) {
                setStatus('idle')
            } else {
                const json = await res.json()
                console.error(json);
                setStatus('unsaved')
            }
        }).catch(err => {
            console.error(err)
            setStatus('unsaved')
        })
    }

    useEffect(() => {
        if(debounced === list && editable === null) {
            setStatus('loading')
            updateSession()
        } else setStatus('unsaved')
    }, [list, debounced])

    function handleEdit(id, value, lastId) {

        if(value === undefined || value === "") setList(list.filter(item => item.id !== lastId))
        else if(id === null) {
            var index = list.findIndex(item => item.id === lastId)
            list[index].text = value
            setList([...list])
        }

        setEditable(id)
    }

    function handleClick() {
        const buffer = JSON.parse(JSON.stringify(list))
        const id =  uuidv4()
        buffer.push({"id": id, "text": "new todo"})
        setList(buffer)
        setEditable(id)
    }

    return (
        <Container align="center">
            <Title
                size="xs"
                mt={100}
            >
                TODO
            </Title>
            <Space h="xl" />
            <Stack>{
                list.map(item => <Item key={item.id} id={item.id} text={item.text} editable={editable} handleEdit={handleEdit} />)
            }</Stack>
            <Space h="xl" />
            <Button
                onClick={handleClick}
                disabled={status === 'loading'}
            >
                New Item {status === 'idle' ? '' : <Text color='red' >*</Text>}
            </Button>
            <p>{JSON.stringify(debounced)}</p>
        </Container>
    )
}

function Item({id, text, editable, handleEdit}) {

    const focusTrapRef = useFocusTrap(editable === id);

    const [value, setValue] = useState(text)

    function handleEnter(e) {
        if(e.key === "Enter") {
            handleEdit(null, value, id)
        }
    }

    return (
        <TextInput
            ref={focusTrapRef}
            disabled={editable !== id}
            rightSection={
                <>
                    { editable === id ?
                        <Check size={24} onClick={() => handleEdit(null, value, id)} /> :
                        <Edit size={24} onClick={() => handleEdit(id, value)} />
                    }
                    
                </>
            }
            onBlur={() => handleEdit(null, value, id)}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleEnter}
        />
    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context);

    return {"props": {preloaded_session: session}}
}