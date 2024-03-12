import ReactDOM from 'react-dom/client'
/* ----------UnoCss相关配置引入---------- */
import '@unocss/reset/normalize.css'
import 'uno.css'
/* ----------Redux相关配置引入---------- */
import store from './store'
import { Provider } from 'react-redux'
/* ----------react-router相关配置引入---------- */
import router from './router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
