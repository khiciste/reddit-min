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
} from 'react-router-dom'

export async function loader() {
  let filters = [{ topic: 'dogs' },
                 { topic: 'golf' },
                 { topic: 'hiking' },
                 { topic: 'cars' },
                 { topic: 'babes' },
                 { topic: 'fitness' },
                 { topic: 'kindness' },
                 { topic: 'travel' },
                 { topic: 'sports' },]
  let q = ''
  return { filters, q }
}

export async function action() {
  return redirect(`/q=${SearchParams}`)
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

  function toggleNav() {
    document.getElementById('sidebar').classList.toggle('hide')
  }

  return (
    <>
      <div id='header'>
        <img id='reddit-logo' src='https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png' />
        <h1>reddit<span className='cool-blue'>min</span></h1>
        <button id='menu-button' onClick={toggleNav}>menu</button>
      </div>
      <div id='sidebar' class='hide'>
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
          <button id='close-button' onClick={toggleNav}>close</button>
        </div>
        <nav>
          <ul>
            {filters.map((filter) => (
              <li key={filter.topic}>
                <NavLink
                  to={`/r/${filter.topic}`}
                  filter={filter.topic}
                  onClick={toggleNav}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'active'
                      : isPending
                      ? 'pending'
                      : ''
                  }>
                  {filter.topic}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id='feed' className={ navigation.state === 'loading' ? 'loading' : '' }>
        <Outlet />
      </div>
    </>
  )
}