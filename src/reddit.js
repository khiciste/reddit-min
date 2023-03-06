// get posts for feed
export const API_ROOT = 'https://www.reddit.com'

export async function getSubredditPosts(subreddit) {
  const response = await fetch(`${API_ROOT}${subreddit}.json`)
  const json = await response.json()

  return json.data.children.map((post) => post.data)
}

export async function search(searchTerm, searchLimit, sortBy) {
  // fetch api of reddit
  return (
    // fetch(
    //   `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    // )
    fetch(
        `https://www.reddit.com/search.json?q=${searchTerm}`
    )
    .then((res) => res.json())
    .then((data) => data.data.children.map((data) => data.data))
    // to get error
    .catch((err) => console.log(err))
  )
}


export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`)
  const json = await response.json()

  return json.data.children.map((subreddit) => subreddit.data)
}

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`)
  const json = await response.json()

  return json[1].data.children.map((subreddit) => subreddit.data)
}