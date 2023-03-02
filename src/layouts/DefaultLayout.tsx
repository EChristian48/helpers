import { MENUS } from '@/helpers'
import {
  AppShell,
  Box,
  Burger,
  Container,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core'
import {
  completeNavigationProgress,
  NavigationProgress,
  startNavigationProgress
} from '@mantine/nprogress'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Link, useNavigation } from 'react-router-dom'

export default function DefaultLayout({ children }: PropsWithChildren) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'loading') startNavigationProgress()
    else completeNavigationProgress()
  }, [navigation.state])

  return (
    <>
      <NavigationProgress />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow component={ScrollArea}>
              <Stack spacing="xs">
                {MENUS.map(({ label, link }, index) => (
                  <NavLink
                    key={index}
                    label={label}
                    component={Link}
                    onClick={() => setOpened(false)}
                    to={link}
                  />
                ))}
              </Stack>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text component={Link} to="/" fw="bold">
                Helpers
              </Text>
            </Box>
          </Header>
        }>
        <Container size="sm" py="xl">
          {children}
        </Container>
      </AppShell>
    </>
  )
}
