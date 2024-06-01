import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app'
import AutoTop from './utils/auto-top'
import LazyLoad from './utils/lazy-load'

const routeList: RouteObject[] = [
  {
    path: '/',
    element: (
      <AutoTop>
        <App />
      </AutoTop>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/home' replace />,
      },
      {
        path: 'login',
        element: LazyLoad(lazy(() => import('@/pages/login'))),
      },
      {
        path: 'home',
        element: LazyLoad(lazy(() => import('@/pages/home'))),
      },
      {
        path: 'followed-new',
        element: LazyLoad(lazy(() => import('@/pages/followed-new'))),
      },
      {
        path: 'explore',
        element: LazyLoad(lazy(() => import('@/pages/explore'))),
      },
      {
        path: 'search-result',
        element: LazyLoad(lazy(() => import('@/pages/search-result'))),
      },
      {
        path: 'work-detail/:workId',
        element: LazyLoad(lazy(() => import('@/pages/work-detail'))),
      },
      {
        path: 'upload',
        element: LazyLoad(lazy(() => import('@/pages/upload'))),
      },
      {
        path: 'personal-center/:userId',
        element: <Navigate to='works' replace />,
      },
      {
        path: 'personal-center/:userId',
        element: LazyLoad(lazy(() => import('@/pages/personal-center'))),
        children: [
          {
            path: 'works',
            element: LazyLoad(lazy(() => import('@/pages/personal-center/my-works'))),
          },
          {
            path: 'favorites/:favoriteId',
            element: LazyLoad(lazy(() => import('@/pages/personal-center/my-favorites'))),
          },
          {
            path: 'likes',
            element: LazyLoad(lazy(() => import('@/pages/personal-center/my-likes'))),
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routeList)

export default router
