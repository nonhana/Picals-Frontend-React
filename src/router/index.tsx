import { createBrowserRouter } from 'react-router-dom'
import App from '@/app'
import Login from '@/pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
])

export default router
