import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/login'
import Home from '@/pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
])

export default router
