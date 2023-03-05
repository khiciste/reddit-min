import { useEffect } from 'react'
import './root.css'
import { 
  Outlet, 
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  useSearchParams,
} from 'react-router-dom'
import { Search, getSubredditPosts } from '../reddit'

export async function loader({ request }) {
  let filters = ['filter 3', 'filter 4']
  let q = ''
  return { filters, q }
}

export async function action(searchTerm) {
  searchTerm = document.getElementById('q').value
  posts = await Search(`${searchParams}`)
  return redirect(`/?q=${searchParams}`)
}

export default function Root() {
  const { filters, q } = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    document.getElementById('q').value = q
  }, [q])

  return (
    <>
      <div id='sidebar'>
        <h1>
          <img src='../../images/reddit-logo-3500.png' />
          reddit<span className='cool-blue'>min</span>
        </h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              id='q'
              className={searching ? 'loading' : ''}
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div
              id='search-spinner'
              aria-hidden
              hidden={!searching}
            />
            <div
              className='sr-only'
              aria-live='polite'
            ></div>
          </Form>
          <Form method='post'>
            <button type='submit'>popular?</button>
          </Form>
        </div>
        <nav>
          
          <input type='button'
                 value='filter 1'
                 name='filter-1' />
          <input type='button'
                 value='filter 2'
                 name='filter-2' />
        </nav>
      </div>
      <div id='detail' className={ navigation.state === 'loading' ? 'loading' : '' }>
        <Outlet />
      </div>
    </>
  )
}