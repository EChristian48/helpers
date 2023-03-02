import {
  Danbooru2Prompt,
  ErrorPage,
  Home,
  PromptsIntersection
} from '@/modules'
import { createHashRouter } from 'react-router-dom'
import App from './App'

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
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
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)

export default router
