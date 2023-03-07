import { useLoaderData } from 'react-router-dom'
import { search, getSubredditPosts, getSubreddits } from '../reddit'
import Post from '../features/Post'

export async function loader({ request }) {
  let popular = '/r/popular'
  let posts = {}
  let subreddits = {}
  let q = ''
  let r = ''

  const url = new URL(request.url)
  const urlString = url.toString()
    // console.log(`url string: ${urlString}`)
  if (urlString.includes('?q=')) {
    q = urlString.slice(urlString.lastIndexOf('?q=') + 3, urlString.length)
  }
  if (urlString.includes('/r/')) {
    r = urlString.slice(urlString.lastIndexOf('/r/') + 3, urlString.length)
  }
    // console.log(`url: ${url}`)
    // console.log(`q: ${q}`)
    // console.log(`r: ${r}`)

  posts = await getSubredditPosts(popular)
  subreddits = await getSubreddits()

  if (q.length > 0) {
    // console.log(`r null/empty, r: ${r}`)
    posts = await search(q)
  }
  else if (r.length > 0) {
    // console.log(`r has length, r: ${r}`)
    posts = await search(r)
  }
  return { posts, q }
}


export default function Index() {
  let { posts, q } = useLoaderData()

  if (posts.length === 0) {
    return (
      <div className='error'>
        <h2>No posts matching ${q}</h2>
      </div>
    )
  }

  return (
    <>
    {posts.map((post, index) => (
      <Post
        key={post.id}
        post={post}
        // onToggleComments={onToggleComments(index)}
      />
    ))}
  </>
)
}