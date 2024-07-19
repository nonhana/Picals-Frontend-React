import '@unocss/reset/normalize.css'
import { ConfigProvider } from 'antd'
import { AliveScope } from 'react-activation'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import 'react-photo-view/dist/react-photo-view.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'

import ErrorPage from './pages/error'
import router from './router'
import { persistor, store } from './store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AliveScope>
        <ConfigProvider
          theme={{
            token: { colorPrimary: '#0090F0' },
          }}>
          <ErrorBoundary fallbackRender={ErrorPage}>
            <RouterProvider fallbackElement={<p>初始化加载...</p>} router={router} />
          </ErrorBoundary>
        </ConfigProvider>
      </AliveScope>
    </PersistGate>
  </Provider>,
)
