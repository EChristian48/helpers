export interface Post {
  id: number
  tag_string: string
  tag_string_general: string
  tag_string_character: string
  tag_string_copyright: string
  tag_string_artist: string
  tag_string_meta: string
  preview_file_url: string
}

export async function fetchPost(url: string): Promise<Post> {
  const match = url.match(/https?:\/\/danbooru\.donmai\.us\/posts\/(\d+)/)
  if (!match) {
    throw new Error('Invalid Danbooru post URL')
  }
  const postId = Number(match[1])
  const response = await fetch(
    `https://danbooru.donmai.us/posts/${postId}.json`
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`)
  }
  const post = await response.json()
  return post as Post
}
