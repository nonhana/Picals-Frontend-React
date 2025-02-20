import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorPage from './pages/error'
import router from './router'
import { persistor, store } from './store'
import 'react-photo-view/dist/react-photo-view.css'
import '@ant-design/v5-patch-for-react-19'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#0090F0' },
        }}
      >
        <ErrorBoundary fallbackRender={ErrorPage}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ConfigProvider>
    </PersistGate>
  </Provider>,
)
