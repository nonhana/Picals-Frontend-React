import { FC } from 'react'
import { PhotoProvider } from 'react-photo-view'
import { Modal, message } from 'antd'

const { confirm } = Modal

type HanaViewerProps = {
  children: React.ReactNode
  onDelete?: (index: number) => void
}

const HanaViewer: FC<HanaViewerProps> = ({ children, onDelete }) => {
  const handleDelete = (index: number, onClose: any) => {
    confirm({
      title: '删除图片',
      content: '确定要删除这张图片吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        onDelete && onDelete(index)
        onClose()
        message.success('删除成功')
      },
    })
  }

  return (
    <PhotoProvider
      maskOpacity={0.7}
      toolbarRender={({ index, onScale, scale, onClose }) => {
        return (
          <>
            <svg
              className='PhotoView-Slider__toolbarIcon'
              onClick={() => onScale(scale + 1)}
              xmlns='http://www.w3.org/2000/svg'
              width='44'
              height='44'
              viewBox='0 0 1024 1024'>
              <path
                fill='currentColor'
                d='M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8m284 424L775 721c122.1-148.9 113.6-369.5-26-509c-148-148.1-388.4-148.1-537 0c-148.1 148.6-148.1 389 0 537c139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11M696 696c-118.8 118.7-311.2 118.7-430 0c-118.7-118.8-118.7-311.2 0-430c118.8-118.7 311.2-118.7 430 0c118.7 118.8 118.7 311.2 0 430'
              />
            </svg>
            <svg
              className='PhotoView-Slider__toolbarIcon'
              onClick={() => onScale(scale - 1)}
              xmlns='http://www.w3.org/2000/svg'
              width='44'
              height='44'
              viewBox='0 0 1024 1024'>
              <path
                fill='currentColor'
                d='M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8m284 424L775 721c122.1-148.9 113.6-369.5-26-509c-148-148.1-388.4-148.1-537 0c-148.1 148.6-148.1 389 0 537c139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11M696 696c-118.8 118.7-311.2 118.7-430 0c-118.7-118.8-118.7-311.2 0-430c118.8-118.7 311.2-118.7 430 0c118.7 118.8 118.7 311.2 0 430'
              />
            </svg>
            {onDelete && (
              <svg
                className='PhotoView-Slider__toolbarIcon'
                onClick={() => handleDelete(index, onClose)}
                xmlns='http://www.w3.org/2000/svg'
                width='44'
                height='44'
                viewBox='0 0 1024 1024'>
                <path
                  fill='currentColor'
                  d='M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z'
                />
              </svg>
            )}
          </>
        )
      }}>
      {children}
    </PhotoProvider>
  )
}

export default HanaViewer
