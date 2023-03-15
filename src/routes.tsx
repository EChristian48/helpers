import { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import App from './App'
import { ErrorPage } from './modules'

const Home = lazy(() => import('@/modules/Home'))
const Danbooru2Prompt = lazy(() => import('@/modules/Danbooru2Prompt'))
const PromptsIntersection = lazy(() => import('@/modules/PromptsIntersection'))

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: '/danbooru2prompt',
            element: <Danbooru2Prompt />
          },
          {
            path: '/prompts-intersection',
            element: <PromptsIntersection />
          }
        ]
      }
    ]
  }
])

export default router
