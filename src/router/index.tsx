import { lazy } from 'react'
import { lazyLoad } from './utils/lazyLoad'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app'

const routeList = [
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
        element: lazyLoad(lazy(() => import('@/pages/login'))),
      },
      {
        path: 'home',
        element: lazyLoad(lazy(() => import('@/pages/home'))),
      },
      {
        path: 'followed-new',
        element: lazyLoad(lazy(() => import('@/pages/followed-new'))),
      },
      {
        path: 'components',
        element: lazyLoad(lazy(() => import('@/pages/components-display'))),
      },
    ],
  },
]

const router = createBrowserRouter(routeList)

export default router
