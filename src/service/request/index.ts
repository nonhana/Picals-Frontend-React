import { notification } from 'antd'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import type { RequestConfig, RequestInterceptors, CreateRequestConfig } from './types'

interface PendingTask {
  config: AxiosRequestConfig
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}

let refreshing = false // 是否正在刷新token
const pendingTasks: PendingTask[] = [] // 维护一个请求队列，用于刷新token时保存请求

class Request {
  instance: AxiosInstance // axios实例

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config) // 传入配置，创建axios实例

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
        return config
      },
      (err) => Promise.reject(err),
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (response) => response.data,
      async (err) => {
        if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
          notification.error({
            message: '请求超时',
            description: '请求超时，请检查网络',
          })
        } else {
          const { status, data, config } = err.response

          if (refreshing) {
            return new Promise((resolve, reject) => {
              pendingTasks.push({ config, resolve, reject })
            })
          }

          // 无感刷新token
          if (status === 401 && !config.url.includes('/user/refresh-token')) {
            try {
              refreshing = true
              const refreshToken = localStorage.getItem('refreshToken')

              const response = await axios({
                url: `${import.meta.env.VITE_BASE_URL}/api/user/refresh-token`,
                method: 'GET',
                params: { refreshToken },
              })

              const data = response.data.data

              localStorage.setItem('accessToken', data.access_token)
              localStorage.setItem('refreshToken', data.refresh_token)

              // 重新发起之前失败的请求
              pendingTasks.forEach((task) => {
                task.config.headers!.Authorization = `Bearer ${data.access_token}`
                this.instance.request(task.config).then(task.resolve).catch(task.reject)
              })
              pendingTasks.length = 0 // 清空队列
              return this.instance.request(config)
            } catch (error) {
              pendingTasks.forEach((task) => {
                task.reject(error)
              })
              pendingTasks.length = 0 // 清空队列
              localStorage.clear()
              // window.location.href = '/'
            } finally {
              refreshing = false
            }
          }

          if (status === 500) {
            notification.error({
              message: '服务器错误',
              description: data.message || '未知错误',
            })
          } else if (status === 413) {
            notification.error({
              message: '文件过大',
              description: '文件过大，选个小点的吧~',
            })
          } else if (status === 404) {
            notification.error({
              message: '请求资源不存在',
              description: '请求的资源不存在，请检查接口地址',
            })
          } else if (status === 400) {
            notification.error({
              message: '客户端错误',
              description: Array.isArray(data.message)
                ? data.message.join('；')
                : data.message || '未知错误',
            })
          }
        }
        return Promise.reject(err) // 返回一个错误的promise，防止继续执行
      },
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res) // 将res放到拦截器中处理完后再返回
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default Request
export type { RequestConfig, RequestInterceptors }
