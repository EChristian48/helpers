import { chunk } from '@/helpers'

export const promptFormatter = (value: string, tagBeforeNewline = 1) =>
  chunk(value.split(' '), tagBeforeNewline)
    .map((value) => value.join(', '))
    .join(', \n')

export const promptFormatterArray = (value: string[], tagBeforeNewline = 1) =>
  chunk(value, tagBeforeNewline)
    .map((value) => value.join(', '))
    .join(', \n')
