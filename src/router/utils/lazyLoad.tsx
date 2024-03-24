import { Suspense } from 'react'
import type { ReactNode, LazyExoticComponent, ComponentType } from 'react'
import { Spin } from 'antd'

export const lazyLoad = (Component: LazyExoticComponent<ComponentType>): ReactNode => {
  return (
    // Suspense 用于在组件树的某个位置渲染 fallback，直到其包裹的子组件加载完成为止
    // 因此其比较常用于异步加载组件时，用于展示 loading 状态
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
