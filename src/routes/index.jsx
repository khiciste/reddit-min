import { useLoaderData } from 'react-router-dom'
import Post from '../features/Post'
import { getSubredditPosts } from '../contacts'


const subreddit = '/r/popular'

// loader for feed data
export async function loader({ request }) {
  const posts = await getSubredditPosts(subreddit)
  return posts
}


export default function Index() {
  const posts = useLoaderData()

  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
      </div>
    );
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