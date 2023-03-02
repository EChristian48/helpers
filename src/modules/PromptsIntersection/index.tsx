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
import { useState } from 'react'
import { z } from 'zod'

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
  prompts: string[]
}

const schema = z.object({
  prompts: z.array(z.string()).min(2)
})

export default function PromptIntersection() {
  const [replaceUnderscores, setReplaceUnderscores] = useInputState(false)
  const [result, setResult] = useState('')
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: {
      prompts: ['']
    }
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const commonElements = findCommonElements(
          ...values.prompts.map((prompt) =>
            prompt.split(',').map((tag) => tag.trim())
          )
        )

        setResult(promptFormatterArray(commonElements, 5))
      })}
      onReset={form.onReset}>
      <Stack spacing="xs">
        <Title order={2}>Prompt Intersection</Title>
        <Text>Look for the same tags in X number of provided prompts</Text>

        {form.values.prompts.map((_, index) => (
          <Grid key={index} align="center">
            <Grid.Col sm={10}>
              <Textarea
                placeholder="Enter prompt here. Use comma to separate tags."
                label={`Prompt #${index + 1}`}
                required
                autosize
                {...form.getInputProps(`prompts.${index}`)}
              />
            </Grid.Col>
            <Grid.Col sm={2}>
              <Button
                fullWidth
                h="100%"
                py={{ base: 'xs' }}
                color="red"
                onClick={() => form.removeListItem('prompts', index)}>
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
            onClick={() => form.insertListItem('prompts', '')}>
            +1 Prompt
          </Button>
          <Button
            type="submit"
            fullWidth
            h="100%"
            disabled={!form.isValid() || !form.isDirty()}
            loaderPosition="right"
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
