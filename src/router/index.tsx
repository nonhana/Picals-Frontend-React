import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app'
import Login from '@/pages/login'
import Home from '@/pages/home'
import ComponentsDisplay from '@/pages/components-display'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/login' replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'components',
        element: <ComponentsDisplay />,
      },
    ],
  },
])

export default router
