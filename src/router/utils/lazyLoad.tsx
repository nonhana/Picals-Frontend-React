import { Suspense } from 'react'
import type { ReactNode, LazyExoticComponent, ComponentType } from 'react'
import { Spin } from 'antd'

export const lazyLoad = (Component: LazyExoticComponent<ComponentType>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        />
      }>
      <Component />
    </Suspense>
  )
}
