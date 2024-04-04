import { FC } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps, UploadFile } from 'antd'
import { message, Upload } from 'antd'

const { Dragger } = Upload

type ImgUploadProps = {
  imgList: UploadFile[]
  setImgList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
}

const ImgUpload: FC<ImgUploadProps> = ({ imgList, setImgList }) => {
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        setImgList([...imgList, ...info.fileList])
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <div className='relative flex flex-col gap-5 items-center'>
      <Dragger {...uploadProps}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>点击上传或者把图片们拖进来~！</p>
        <p className='ant-upload-hint'>支持JPG、PNG格式的图片，大小≤10MB！再大就不行了哦！</p>
      </Dragger>
      <div className='w-212 flex flex-wrap gap-5'>
        {imgList.map((file, index) => (
          <div key={index} className='w-29.5 h-29.5 rd-1 overflow-hidden cursor-pointer'>
            <img
              className='w-full h-full object-cover'
              src={file.response ? file.response.data.url : file.url}
              alt={file.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImgUpload
