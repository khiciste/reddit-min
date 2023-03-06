import { useLoaderData, useSearchParams } from 'react-router-dom'
import { Search, getSubredditPosts } from '../reddit'
import Post from '../features/Post'

// loader for feed data
export async function loader({ request }) {
  let popular = '/r/popular'
  let posts = {}
  let q = ''
  let r = ''

  const url = new URL(request.url)
  const urlString = url.toString()
  console.log(`url string: ${urlString}`)
  // q = url.searchParams.get('q')
  if (urlString.includes('?q=')) {
    q = urlString.slice(urlString.lastIndexOf('?q=') + 3, urlString.length)
  }
  if (urlString.includes('/r/')) {
    r = urlString.slice(urlString.lastIndexOf('/r/') + 3, urlString.length)
  }
  // r = url.substr(url.locate("/r/"), url.length)
    console.log(`url: ${url}`)
    console.log(`q: ${q}`)
    console.log(`r: ${r}`)

  posts = await getSubredditPosts(popular)

  if (q.length > 0) {
    console.log(`r null/empty, r: ${r}`)
    posts = await Search(q)
  }
  else if (r.length > 0) {
    // r = urlString.slice(urlString.lastIndexOf("/") + 4, urlString.length)
    console.log(`r has length, r: ${r}`)
    posts = await Search(r)
  }
  return posts
}


export default function Index() {
  let posts = useLoaderData()

  // if (posts.length === 0) {
  //   return (
  //     <div className='error'>
  //       <h2>No posts matching search</h2>
  //     </div>
  //   )
  // }

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