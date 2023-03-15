import { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import App from './App'
import {
  DANBOORU2PROMPT_PATH,
  DANBOORU_INTERSECTION_PATH,
  PROMPTS_INTERSECTION_PATH
} from './constants'
import { ErrorPage } from './modules'

const Home = lazy(() => import('@/modules/Home'))
const Danbooru2Prompt = lazy(() => import('@/modules/Danbooru2Prompt'))
const DanbooruIntersection = lazy(
  () => import('@/modules/DanbooruIntersection')
)
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
            path: DANBOORU2PROMPT_PATH,
            element: <Danbooru2Prompt />
          },
          {
            path: DANBOORU_INTERSECTION_PATH,
            element: <DanbooruIntersection />
          },
          {
            path: PROMPTS_INTERSECTION_PATH,
            element: <PromptsIntersection />
          }
        ]
      }
    ]
  }
])

export default router
