import { FC, useRef, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload, notification, Progress } from 'antd'
import HanaViewer from '@/components/common/hana-viewer'
import { PhotoView } from 'react-photo-view'
import HanaModal from '@/components/common/hana-modal'
import axios from 'axios'

const { Dragger } = Upload

type ImgUploadProps = {
  imgList: string[]
  setImgList: React.Dispatch<React.SetStateAction<string[]>>
}

const ImgUpload: FC<ImgUploadProps> = ({ imgList, setImgList }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [uploadList, setUploadList] = useState<{ fileName: string; progress: number }[]>([])
  const orderedList = useRef<string[]>([])

  const handleSubmit = async (file: File, index: number) => {
    const newUploadItem = { fileName: file.name, progress: 0 }
    setUploadList((prevList) => [...prevList, newUploadItem])
    setShowModal(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/tool/upload-single-img`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || file.size),
            )
            setUploadList((prevList) =>
              prevList.map((item) =>
                item.fileName === file.name ? { ...item, progress: percentCompleted } : item,
              ),
            )
          },
        },
      )

      orderedList.current[index] = data.data
      if (orderedList.current.every((item) => item)) {
        setImgList([...imgList, ...orderedList.current])
        orderedList.current = [] // 清空临时数组
      }
      setUploadList((prevList) => prevList.filter((item) => item.fileName !== file.name))
      message.success(`${file.name}上传成功！`)
    } catch (error: any) {
      notification.error({
        message: '上传失败',
        description: error.response?.data?.message || '上传过程中出现错误，请稍后再试。',
      })
    } finally {
      if (uploadList.length === 0) setShowModal(false)
    }
  }

  const uploadProps: UploadProps = {
    name: 'image',
    multiple: true,
    customRequest: async (options) => {
      const file = options.file as File
      const index = orderedList.current.length
      orderedList.current.push('') // 占位符
      await handleSubmit(file, index)
    },
    showUploadList: false,
    accept: '.jpg,.png,.gif',
    beforeUpload: (file) => {
      // 检验大小
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('图片大小不能超过10MB！')
      }

      // 检验格式是否符合.jpg .png .gif
      const allowFormat =
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      if (!allowFormat) {
        message.error('只能上传JPG/PNG/GIF格式的图片！')
      }

      return isLt10M && allowFormat
    },
  }

  const onDelete = (index: number) => {
    const newImgList = imgList.filter((_, idx) => idx !== index)
    setImgList(newImgList)
  }

  return (
    <>
      <div className='relative flex flex-col gap-5 items-center'>
        <Dragger {...uploadProps}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>点击上传或者把图片们拖进来~！</p>
          <p className='ant-upload-hint'>
            支持JPG、PNG、GIF格式的图片，大小≤10MB！再大就不行了哦！
          </p>
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

      <HanaModal
        title='图片上传'
        visible={showModal}
        setVisible={setShowModal}
        allowActivelyClose={false}>
        <div className='m-10 mt-0'>
          {uploadList.map((item, index) => (
            <div key={index} className='flex items-center mb-2'>
              <span className='w-45 whitespace-nowrap overflow-hidden text-ellipsis inline-block'>
                {item.fileName}：
              </span>
              <Progress percent={item.progress} />
            </div>
          ))}
        </div>
      </HanaModal>
    </>
  )
}

export default ImgUpload
