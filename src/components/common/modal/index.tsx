import { FC } from 'react'
import { Icon } from '@iconify/react'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'antd'

type ModalProps = {
  loading?: boolean
  zIndex?: number
  visible: boolean
  title: string
  setVisible: (visible: boolean) => void
  children: React.ReactNode
  onOk?: () => void // 触发确定按钮的回调
}

const Modal: FC<ModalProps> = ({ loading, visible, title, setVisible, children, onOk, zIndex }) => {
  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 ${zIndex ? `z-${zIndex - 1}` : 'z-1999'}`}
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-1/2 w-162 bg-white rd-6 flex flex-col ${zIndex ? `z-${zIndex}` : 'z-2000'}`}>
          <div className='relative w-full h-16 flex justify-center items-center color-#3d3d3d font-size-18px font-bold'>
            <span>{title}</span>
            <Icon
              className='absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer'
              color='#858585'
              width='24px'
              icon='ant-design:close-outlined'
              onClick={() => setVisible(false)}
            />
          </div>
          {children}

          {onOk && (
            <div className='relative p-5 w-full flex gap-5 justify-end'>
              <Button
                type='default'
                shape='round'
                onClick={() => {
                  setVisible(false)
                }}>
                取消
              </Button>
              <Button type='primary' shape='round' loading={loading} onClick={onOk}>
                确定
              </Button>
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal
