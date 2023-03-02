import { Outlet } from 'react-router-dom'
import { DefaultLayout } from './layouts'

export default function App() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}
