import { Icon } from '@iconify/react'
import { Button } from 'antd'
import { FC, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type HanaModalProps = {
  loading?: boolean
  zIndex?: number
  width?: number
  visible: boolean
  title: string
  allowActivelyClose?: boolean
  setVisible: (visible: boolean) => void
  children: React.ReactNode
  onOk?: () => void // 触发确定按钮的回调
}

const HanaModal: FC<HanaModalProps> = ({
  loading,
  visible,
  width = 648,
  title,
  allowActivelyClose = true,
  setVisible,
  children,
  onOk,
  zIndex,
}) => {
  const toggleBodyOverflow = (visible: boolean) => {
    document.documentElement.style.overflow = visible ? 'hidden scroll' : ''
    document.body.style.overflow = visible ? 'hidden' : ''
    document.body.style.maxHeight = visible ? '100vh' : ''
  }

  useEffect(() => {
    toggleBodyOverflow(visible)
  }, [visible])

  const templateClick = () => {
    if (allowActivelyClose) {
      setVisible(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{ zIndex: zIndex ? zIndex - 1 : 1999 }}
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32'
          onClick={templateClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {visible && (
        <motion.div
          style={{ width: `${width}px`, zIndex: zIndex || 2000 }}
          className='fixed top-1/2 left-1/2 transform -translate-1/2 bg-white rd-6 flex flex-col'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <div className='relative w-full h-16 flex justify-center items-center color-shallowblack font-size-18px font-bold'>
            <span>{title}</span>
            {allowActivelyClose && (
              <Icon
                className='absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer'
                color='#858585'
                width='24px'
                icon='ant-design:close-outlined'
                onClick={() => setVisible(false)}
              />
            )}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HanaModal
