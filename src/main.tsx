import ReactDOM from 'react-dom/client'
import 'react-photo-view/dist/react-photo-view.css'
import '@unocss/reset/normalize.css'
import 'uno.css'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import router from './router'
import { AliveScope } from 'react-activation'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AliveScope>
        <RouterProvider fallbackElement={<p>初始化加载...</p>} router={router} />
      </AliveScope>
    </PersistGate>
  </Provider>,
)
