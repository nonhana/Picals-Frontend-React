import type { FC } from 'react'
import { Icon } from '@iconify/react'
import { Button } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

interface HanaModalProps {
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
          className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-32"
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
          className="fixed left-1/2 top-1/2 flex flex-col transform rd-6 bg-white -translate-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-16 w-full flex items-center justify-center text-lg color-neutral-900 font-bold">
            <span>{title}</span>
            {allowActivelyClose && (
              <Icon
                className="absolute right-5 top-1/2 transform cursor-pointer -translate-y-1/2"
                color="#858585"
                width="24px"
                icon="ant-design:close-outlined"
                onClick={() => setVisible(false)}
              />
            )}
          </div>
          {children}

          {onOk && (
            <div className="relative w-full flex justify-end gap-5 p-5">
              <Button
                type="default"
                shape="round"
                onClick={() => {
                  setVisible(false)
                }}
              >
                取消
              </Button>
              <Button type="primary" shape="round" loading={loading} onClick={onOk}>
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
