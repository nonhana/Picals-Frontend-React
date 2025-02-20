import type { ComponentType, LazyExoticComponent, ReactNode } from 'react'
import { Spin } from 'antd'
import { Suspense } from 'react'

function LazyLoad(Component: LazyExoticComponent<ComponentType>): ReactNode {
  return (
    <Suspense
      fallback={(
        <div className="relative h-screen w-full flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
    >
      <Component />
    </Suspense>
  )
}

export default LazyLoad
