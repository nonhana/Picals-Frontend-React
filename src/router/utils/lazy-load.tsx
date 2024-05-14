import { Suspense } from 'react'
import type { ReactNode, LazyExoticComponent, ComponentType } from 'react'
import { Spin } from 'antd'

const LazyLoad = (Component: LazyExoticComponent<ComponentType>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size='large'
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        />
      }>
      <Component />
    </Suspense>
  )
}

export default LazyLoad
