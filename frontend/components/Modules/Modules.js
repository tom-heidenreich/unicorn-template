import { Text, Title, Anchor, Space} from "@mantine/core"
import useStyles from './Modules.styles';

import { BrandGithub } from 'tabler-icons-react';

export default function Modules() {

    const { classes } = useStyles();

    return (
        <Text>
            <Title className={classes.title} align="center" mt={70}>
                Modules
            </Title>
            <Space h='xl' />
            <Text color="dimmed" align="center" size="xl" mx="auto" mt="xl">
                <Anchor size="xl" href="https://mantine.dev">Mantine</Anchor>
                <Space h='xs'/>
                <Anchor size="xl" href="https://next-auth.js.org">NextAuth.js</Anchor>
                <Space h='xs'/>
                <Anchor size="xl" href="https://tabler-icons-react.vercel.app">Tabler Icons React</Anchor>
            </Text>
        </Text>
    )
}