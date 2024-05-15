import request from '@/service'
import { IRefreshTokenReq, IRefreshTokenRes } from './types'

// 根据 refreshToken 获取新的 token
export const refreshTokenAPI = (params: IRefreshTokenReq) => {
  return request<IRefreshTokenReq, IRefreshTokenRes>({
    url: '/api/user/refresh-token',
    method: 'GET',
    params,
  })
}
