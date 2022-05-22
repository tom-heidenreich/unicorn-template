import { Title, Text, Anchor, Space } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <Text style={{'userSelect': 'none'}}>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to the <br/> next {' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'mediumvioletred', to: 'hotpink', deg: 45 }}>
          Unicorn
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/theming/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.js file.
      </Text>
      <Space mt="xl" />
      <Title align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        What modules are used?
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes modules such as Mantine, NextAuth.js and {' '}
        <Anchor href="/modules">
         more
        </Anchor>
        .
      </Text>
    </Text>
  );
}
