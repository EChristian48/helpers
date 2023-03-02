import { Container, Text, Title } from '@mantine/core'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <Container size="sm" py="xl">
      <Title order={1}>Oops!</Title>
      <Text fz="xl" fw="bold">
        Sorry, an unexpected error has occurred.
      </Text>
      <Text>{JSON.stringify(error)}</Text>
    </Container>
  )
}
