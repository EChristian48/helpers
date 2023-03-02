import { showNotification } from '@mantine/notifications'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from './services'

const QUERY_KEY = 'danbooru2prompt'

export const useGetPost = (url: string) => {
  const queryResult = useQuery({
    queryKey: [QUERY_KEY, url],
    queryFn: () => fetchPost(url),
    enabled: false,
    onError: (error) => {
      showNotification({
        title: 'Error',
        message: JSON.stringify(error),
        color: 'red'
      })
    }
  })

  return queryResult
}
