import ReactDOM from 'react-dom/client'
import 'react-photo-view/dist/react-photo-view.css'
import '@unocss/reset/normalize.css'
import 'uno.css'
import store from './store'
import { Provider } from 'react-redux'
import router from './router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider fallbackElement={<p>初始化加载...</p>} router={router} />
  </Provider>,
)
