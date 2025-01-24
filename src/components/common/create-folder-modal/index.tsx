import type { FavoriteFormInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Flex, Input, Modal, Upload, message, notification, type UploadProps } from 'antd'
import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import LazyImg from '../lazy-img'

type CreateFolderModalProps = {
  editMode: boolean
  modalStatus: boolean
  confirmAction: () => void
  cancelAction: () => void
  formInfo: FavoriteFormInfo
  setFormInfo: React.Dispatch<React.SetStateAction<FavoriteFormInfo>>
}

const CreateFolderModal: FC<CreateFolderModalProps> = ({
  editMode,
  modalStatus,
  confirmAction,
  cancelAction,
  formInfo,
  setFormInfo,
}) => {
  const [imgHovering, setImgHovering] = useState(false)

  const removeImg = () => {
    setFormInfo((prev) => {
      const newFormInfo = { ...prev }
      delete newFormInfo.cover
      return newFormInfo
    })
    setImgHovering(false)
  }

  const uploadProps: UploadProps = {
    name: 'image',
    multiple: true,
    action: `${import.meta.env.VITE_BASE_URL}/api/tool/upload-single-img`,
    showUploadList: false,
    accept: '.jpg,.png,.gif',
    onChange(info) {
      const { status } = info.file
      if (status === 'done') {
        setFormInfo({ ...formInfo, cover: info.file.response.data })
        message.success(`${info.file.name} 上传成功`)
      } else if (status === 'error') {
        notification.error({
          message: '上传失败',
          description: info.file.response.message || '未知错误',
        })
      }
    },
  }

  return (
    <Modal
      title={editMode ? '编辑收藏夹' : '新建收藏夹'}
      width='420px'
      open={modalStatus}
      okText='确认'
      cancelText='取消'
      onOk={confirmAction}
      onCancel={cancelAction}>
      <Flex vertical gap={20} className='mt-5'>
        <Flex align='center'>
          <span className='w-80px'>名称：</span>
          <Input
            className='w-250px'
            placeholder='请输入收藏集名称'
            value={formInfo.name}
            onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
          />
        </Flex>
        <Flex align='center'>
          <span className='w-80px'>简介：</span>
          <Input
            className='w-250px'
            placeholder='请输入收藏集简介'
            value={formInfo.intro}
            onChange={(e) => setFormInfo({ ...formInfo, intro: e.target.value })}
          />
        </Flex>
        <Flex align='center'>
          <span className='w-80px'>封面：</span>
          {formInfo.cover ? (
            <div
              className='relative w-100px h-100px cursor-pointer rd-1 overflow-hidden'
              onMouseEnter={() => setImgHovering(true)}
              onMouseLeave={() => setImgHovering(false)}>
              <AnimatePresence>
                {imgHovering && (
                  <motion.div
                    className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-32 text-white text-m z-1'
                    onClick={removeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <span>移除图片</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <LazyImg src={formInfo.cover} alt={formInfo.cover} />
            </div>
          ) : (
            <Upload {...uploadProps}>
              <div className='w-100px h-100px flex justify-center items-center bg-normal cursor-pointer'>
                <Icon width='24px' color='#858585' icon='ant-design:upload-outlined' />
              </div>
            </Upload>
          )}
        </Flex>
      </Flex>
    </Modal>
  )
}

export default CreateFolderModal
