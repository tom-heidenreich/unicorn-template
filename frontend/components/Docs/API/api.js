import { Text, Title, Code, Anchor, Space } from '@mantine/core';
import GoLogo from './gologo.svg';

export default function ApiDocs() {
    return (
        <>
            <Title align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt={50}>
                API Docs
            </Title>
            <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
                Get started by editing <Code>/unicorn-template/api/src/main.go</Code>.
                <br/>
                Learn <GoLogo
                    width="2.2rem"
                /> <Anchor href="https://golang.org/">here</Anchor>.
                <Space mt="xl" />
                Test these routes: <br/>
                <Code>/ping</Code>,{' '}
                <Code>/login</Code> or{' '}
                <Code>/sessions/:id</Code>
            </Text>
        </>
    )
}