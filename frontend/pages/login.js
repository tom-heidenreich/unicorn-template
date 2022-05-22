import { Text, Button, Title, Space, Code, Anchor } from "@mantine/core"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <Text align="center">
                <Title mt={100}>Signed in</Title>
                <Space h='md' />
                <Button onClick={signOut}>Sign out</Button>
            </Text>
        )
    }
    return (
        <Text align="center">
            <Space h={100} />
            <Title>Not signed in</Title>
            <Space h='md' />
            <Button onClick={signIn}>Sign in</Button>
            <Space h='xl' />
            Get started by setting up providers in <Code>{'/pages/api/[...nextauth].js'}</Code>
            <br />
            Read more about <Anchor href="https://next-auth.js.org">NextAuth.js</Anchor>
        </Text>
    )
}