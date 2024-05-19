import { FC } from 'react'
import { Icon } from '@iconify/react'
import { CSSTransition } from 'react-transition-group'

type ModalProps = {
  visible: boolean
  title: string
  setVisible: (visible: boolean) => void
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ visible, title, setVisible, children }) => {
  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 z-1999'
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div className='fixed top-1/2 left-1/2 transform -translate-1/2 w-162 bg-white rd-6 flex flex-col z-2000'>
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
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal
