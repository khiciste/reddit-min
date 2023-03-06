import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import Root, { 
  loader as rootLoader,
  action as searchAction,
} from './routes/root'
import ErrorPage from './error-page'
import Index, {
  loader as feedLoader,
} from './routes/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: searchAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: feedLoader, },
          { path: '/r/:filter', element: <Index />, loader: feedLoader, },
        ],
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)