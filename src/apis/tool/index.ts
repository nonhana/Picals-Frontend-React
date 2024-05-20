import request from '@/service'
import { IUploadImageReq } from './types'

// 上传单张图片
export const uploadImageAPI = (data: IUploadImageReq) => {
  return request<IUploadImageReq, string>({
    url: '/api/tool/upload-single-img',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
