import {
  Button,
  Checkbox,
  Grid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { matches, useForm } from '@mantine/form'
import { useInputState } from '@mantine/hooks'

const DANBOORU_REGEX = /^https:\/\/danbooru\.donmai\.us\/posts\/\d+/

interface FormValues {
  url: string
}

export default function PromptIntersection() {
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

  return (
    <Stack spacing="xs">
      <Title order={2}>Prompt Intersection</Title>
      <Text>Look for the same tags in X number of provided prompts</Text>

      <form onSubmit={form.onSubmit(console.log)} onReset={form.onReset}>
        <Grid>
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
              disabled={!form.isValid() || !form.isDirty()}
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
    </Stack>
  )
}
