import { promptFormatter } from '@/helpers'
import {
  Button,
  Checkbox,
  Code,
  Grid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { matches, useForm } from '@mantine/form'
import { useInputState } from '@mantine/hooks'
import { Fragment } from 'react'
import { useGetPost } from './hooks'

const DANBOORU_REGEX = /^https:\/\/danbooru\.donmai\.us\/posts\/\d+/
const EMPTY_PLACEHOLDER = 'Empty'

interface FormValues {
  url: string
}

export default function Danbooru2Prompt() {
  const [replaceUnderscores, setReplaceUnderscores] = useInputState(false)

  const form = useForm<FormValues>({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      url: ''
    },
    validate: {
      url: matches(DANBOORU_REGEX, 'Invalid URL')
    }
  })

  const { data, isInitialLoading, refetch } = useGetPost(form.values.url)

  const promptsArray = [
    {
      label: 'All prompts',
      value: promptFormatter(data?.tag_string ?? EMPTY_PLACEHOLDER, 5)
    },
    {
      label: 'Artist prompts',
      value: promptFormatter(data?.tag_string_artist ?? EMPTY_PLACEHOLDER)
    },
    {
      label: 'Character prompts',
      value: promptFormatter(data?.tag_string_character ?? EMPTY_PLACEHOLDER)
    },
    {
      label: 'Copyright prompts',
      value: promptFormatter(data?.tag_string_copyright ?? EMPTY_PLACEHOLDER)
    },
    {
      label: 'General prompts',
      value: promptFormatter(data?.tag_string_general ?? EMPTY_PLACEHOLDER, 5)
    },
    {
      label: 'Meta prompts',
      value: promptFormatter(data?.tag_string_meta ?? EMPTY_PLACEHOLDER)
    }
  ]

  return (
    <Stack spacing="xs">
      <Title order={2}>Danbooru2Prompt</Title>
      <Text>
        Get tags from a danbooru post and convert it into a prompts separated by
        commas
      </Text>

      <form onSubmit={form.onSubmit(() => refetch())} onReset={form.onReset}>
        <Grid align="end">
          <Grid.Col sm={10}>
            <TextInput
              placeholder="Danbooru post URL"
              label="URL"
              required
              {...form.getInputProps('url')}
            />
          </Grid.Col>
          <Grid.Col sm={2}>
            <Button
              type="submit"
              fullWidth
              h="100%"
              disabled={!form.isValid() || !form.isDirty() || isInitialLoading}
              loading={isInitialLoading}
              loaderPosition="right"
              py={{ base: 'xs' }}>
              Submit
            </Button>
          </Grid.Col>
        </Grid>
      </form>

      <Checkbox
        label="Replace underscore with space"
        checked={replaceUnderscores}
        onChange={setReplaceUnderscores}
      />

      {promptsArray.map(({ label, value }, index) => (
        <Fragment key={index}>
          <Text>{label}:</Text>
          <Code block>
            {replaceUnderscores ? value.replaceAll('_', ' ') : value}
          </Code>
        </Fragment>
      ))}
    </Stack>
  )
}
