import { chunk } from '@/helpers'

const promptFormatter = (value: string, tagBeforeNewline = 1) =>
  chunk(value.split(' '), tagBeforeNewline)
    .map((value) => value.join(', '))
    .join(', \n')

export default promptFormatter
