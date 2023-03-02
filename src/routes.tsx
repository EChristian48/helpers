import {
  Danbooru2Prompt,
  ErrorPage,
  Home,
  PromptsIntersection
} from '@/modules'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

const router = createBrowserRouter([
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
])

export default router
