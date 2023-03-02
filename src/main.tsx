import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: 'dark'
      }}
      withGlobalStyles
      withNormalizeCSS>
      <NotificationsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
)
