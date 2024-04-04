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
        path: 'explore',
        element: lazyLoad(lazy(() => import('@/pages/explore'))),
      },
      {
        path: 'search-result',
        element: lazyLoad(lazy(() => import('@/pages/search-result'))),
      },
      {
        path: 'work-detail/:workId',
        element: lazyLoad(lazy(() => import('@/pages/work-detail'))),
      },
      {
        path: 'upload',
        element: lazyLoad(lazy(() => import('@/pages/upload'))),
      },
    ],
  },
]

const router = createBrowserRouter(routeList)

export default router
