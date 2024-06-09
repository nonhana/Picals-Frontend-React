import { FC } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload, notification } from 'antd'
import HanaViewer from '@/components/common/hana-viewer'
import { PhotoView } from 'react-photo-view'

const { Dragger } = Upload

type ImgUploadProps = {
  imgList: string[]
  setImgList: React.Dispatch<React.SetStateAction<string[]>>
}

const ImgUpload: FC<ImgUploadProps> = ({ imgList, setImgList }) => {
  const uploadProps: UploadProps = {
    name: 'image',
    multiple: true,
    action: `${import.meta.env.VITE_BASE_URL}/api/tool/upload-single-img`,
    showUploadList: false,
    accept: '.jpg,.png,.gif',
    onChange(info) {
      const { status } = info.file
      if (status === 'done') {
        setImgList([...imgList, info.file.response ? info.file.response.data : info.file.url])
        message.success(`${info.file.name} 上传成功`)
      } else if (status === 'error') {
        notification.error({
          message: '上传失败',
          description: info.file.response.message || '未知错误',
        })
      }
    },
  }

  // 移除某张图片
  const onDelete = (index: number) => {
    const newImgList = imgList.filter((_, idx) => idx !== index)
    setImgList(newImgList)
  }

  return (
    <div className='relative flex flex-col gap-5 items-center'>
      <Dragger {...uploadProps}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>点击上传或者把图片们拖进来~！</p>
        <p className='ant-upload-hint'>支持JPG、PNG、GIF格式的图片，大小≤10MB！再大就不行了哦！</p>
      </Dragger>

      <div className='w-212 flex flex-wrap gap-5'>
        <HanaViewer onDelete={onDelete}>
          {imgList.map((url, index) => (
            <div key={index} className='w-29.5 h-29.5 rd-1 overflow-hidden cursor-pointer'>
              <PhotoView key={index} src={url}>
                <img className='w-full h-full object-cover' src={url} alt={url} />
              </PhotoView>
            </div>
          ))}
        </HanaViewer>
      </div>
    </div>
  )
}

export default ImgUpload
