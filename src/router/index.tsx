import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app'
import Login from '@/pages/login'
import Home from '@/pages/home'

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
    ],
  },
])

export default router
