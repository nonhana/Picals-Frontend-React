import { lazy } from 'react'
import { lazyLoad } from './utils/lazyLoad'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app'

const routeList: RouteObject[] = [
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
      {
        path: 'personal-center/:userId',
        element: <Navigate to='works' replace />,
      },
      {
        path: 'personal-center/:userId',
        element: lazyLoad(lazy(() => import('@/pages/personal-center'))),
        children: [
          {
            path: 'works',
            element: lazyLoad(lazy(() => import('@/pages/personal-center/my-works'))),
          },
          {
            path: 'favorites',
            element: lazyLoad(lazy(() => import('@/pages/personal-center/my-favorites'))),
          },
          {
            path: 'likes',
            element: lazyLoad(lazy(() => import('@/pages/personal-center/my-likes'))),
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routeList)

export default router
