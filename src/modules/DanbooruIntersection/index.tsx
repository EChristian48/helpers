import { promptFormatterArray } from '@/helpers'
import {
  Button,
  Checkbox,
  Code,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useInputState } from '@mantine/hooks'
import {
  completeNavigationProgress,
  setNavigationProgress,
  startNavigationProgress
} from '@mantine/nprogress'
import { useState } from 'react'
import { z } from 'zod'
import { fetchPost } from './services'

const DANBOORU_REGEX = /^https:\/\/danbooru\.donmai\.us\/posts\/\d+/

function findCommonElements(...arrays: string[][]): string[] {
  const counts = new Map<string, number>()
  const result: string[] = []

  for (const array of arrays) {
    for (const element of array) {
      counts.set(element, (counts.get(element) || 0) + 1)
      if (counts.get(element) === 2) {
        result.push(element)
      }
    }
  }

  return result
}

interface FormValues {
  postUrls: string[]
}

const schema = z.object({
  postUrls: z
    .array(z.string().regex(DANBOORU_REGEX, 'Invalid danbooru post url'))
    .min(2)
})

export default function PromptIntersection() {
  const [replaceUnderscores, setReplaceUnderscores] = useInputState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    initialValues: {
      postUrls: ['']
    }
  })

  return (
    <form
      onSubmit={form.onSubmit(async ({ postUrls }) => {
        setIsLoading(true)
        startNavigationProgress()
        const fetchedPosts = []
        for (const [index, postUrl] of postUrls.entries()) {
          if (index !== 0)
            await new Promise((resolve) => setTimeout(resolve, 1000))

          const { tag_string } = await fetchPost(postUrl)
          fetchedPosts.push(tag_string.split(' '))
          setNavigationProgress(Math.floor(100 / postUrls.length) * (index + 1))
        }
        const commonTags = findCommonElements(...fetchedPosts)
        setResult(promptFormatterArray(commonTags, 5))
        completeNavigationProgress()
        setIsLoading(false)
      })}
      onReset={form.onReset}>
      <Stack spacing="xs">
        <Title order={2}>Danbooru Intersection</Title>
        <Text>Look for the same tags in X number of danbooru posts</Text>

        {form.values.postUrls.map((_, index) => (
          <Grid key={index} align="end">
            <Grid.Col sm={10}>
              <Textarea
                placeholder="Enter danbooru post url"
                label={`Post #${index + 1}`}
                required
                autosize
                {...form.getInputProps(`postUrls.${index}`)}
              />
            </Grid.Col>
            <Grid.Col sm={2}>
              <Button
                fullWidth
                h="100%"
                py={{ base: 'xs' }}
                color="red"
                onClick={() => form.removeListItem('postUrls', index)}>
                Delete
              </Button>
            </Grid.Col>
          </Grid>
        ))}

        <SimpleGrid cols={2}>
          <Button
            fullWidth
            h="100%"
            py={{ base: 'xs' }}
            color="green"
            onClick={() => form.insertListItem('postUrls', '')}>
            +1 Prompt
          </Button>
          <Button
            type="submit"
            fullWidth
            h="100%"
            disabled={!form.isValid() || !form.isDirty()}
            loaderPosition="right"
            loading={isLoading}
            py={{ base: 'xs' }}>
            Submit
          </Button>
        </SimpleGrid>

        <Checkbox
          label="Replace underscore with space"
          checked={replaceUnderscores}
          onChange={setReplaceUnderscores}
        />

        <Text>Intersection Result:</Text>
        <Code block>
          {replaceUnderscores ? result.replaceAll('_', ' ') : result}
        </Code>
      </Stack>
    </form>
  )
}
