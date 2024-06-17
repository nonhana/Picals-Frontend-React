import { FC } from 'react'
import { PhotoProvider } from 'react-photo-view'
import { Modal, message } from 'antd'

const { confirm } = Modal

type HanaViewerProps = {
  children: React.ReactNode
  onDelete?: (index: number) => void
  onDownload?: (index: number) => void
  gettingBlob?: boolean
}

const HanaViewer: FC<HanaViewerProps> = ({ children, onDelete, onDownload, gettingBlob }) => {
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
      className='select-none'
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
            {onDownload &&
              (gettingBlob ? (
                <svg
                  className='PhotoView-Slider__toolbarIcon cursor-default animate-spin'
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  viewBox='0 0 1024 1024'>
                  <path
                    fill='currentColor'
                    d='M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874S66 772.3 40.2 711.3C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9s87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952s117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3s72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512s-11.6-117-34.6-171.3a440.5 440.5 0 0 0-94.3-139.9a437.7 437.7 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150s83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874s-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3'
                  />
                </svg>
              ) : (
                <svg
                  className='PhotoView-Slider__toolbarIcon'
                  onClick={() => onDownload(index)}
                  xmlns='http://www.w3.org/2000/svg'
                  width='44'
                  height='44'
                  viewBox='0 0 1024 1024'>
                  <path
                    fill='currentColor'
                    d='M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8'
                  />
                </svg>
              ))}
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
