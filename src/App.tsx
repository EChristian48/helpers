import { Text } from '@mantine/core'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { DefaultLayout } from './layouts'

export default function App() {
  return (
    <DefaultLayout>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Outlet />
      </Suspense>
    </DefaultLayout>
  )
}
