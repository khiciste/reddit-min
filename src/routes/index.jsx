import { useLoaderData, } from 'react-router-dom'
import { Search, getSubredditPosts } from '../reddit'
import Post from '../features/Post'

let searchTerm = 'popular'
let posts = {}

// loader for feed data
export async function loader({ request }) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
  if (q) {
    console.log(q)
    posts = await Search(q)
  }
  else {
    console.log(searchTerm)
    posts = await getSubredditPosts(searchTerm)
  }
  return posts
}


export default function Index() {
  let posts = useLoaderData()

  if (posts.length === 0) {
    return (
      <div className='error'>
        <h2>No posts matching '{searchTerm}'</h2>
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