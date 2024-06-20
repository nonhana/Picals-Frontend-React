import { Suspense } from 'react'
import type { ReactNode, LazyExoticComponent, ComponentType } from 'react'
import { Spin } from 'antd'

const LazyLoad = (Component: LazyExoticComponent<ComponentType>): ReactNode => {
  return (
    <Suspense
      fallback={
        <div className='relative w-full h-screen flex justify-center items-center'>
          <Spin size='large' />
        </div>
      }>
      <Component />
    </Suspense>
  )
}

export default LazyLoad
