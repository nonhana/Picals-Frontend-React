import { FC, useEffect, useState, useRef } from 'react'
import { updateUserInfoAPI, uploadImageAPI } from '@/apis'
import type { IUpdateUserInfoReq } from '@/apis/user/types'
import type { UserDetailInfo } from '@/utils/types'
import { base64ToFile, MAX_INFO_SIZE } from '@/utils'
import { Icon } from '@iconify/react'
import { CSSTransition } from 'react-transition-group'
import { Input, Button, message, Radio } from 'antd'
import Modal from '../common/modal'
import HanaCropper from '../common/hana-cropper'

const { TextArea } = Input

type EditModalProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  onConfirm: () => void
  info: UserDetailInfo
}

const EditModal: FC<EditModalProps> = ({ visible, setVisible, onConfirm, info }) => {
  const [editUserInfo, setEditUserInfo] = useState<IUpdateUserInfoReq>({})
  useEffect(() => {
    setEditUserInfo({
      avatar: info.avatar,
      backgroundImg: info.background_img,
      signature: info.intro,
      username: info.username,
      gender: info.gender,
    })
  }, [info])

  const [loading, setLoading] = useState(false)

  const bgImgInput = useRef<HTMLInputElement | null>(null)
  const [bgImgFile, setBgImgFile] = useState<File | null>(null) // 背景图片文件
  const [bgHovering, setBgHovering] = useState(false)
  const [bgCropperVisible, setBgCropperVisible] = useState(false)

  // 选择背景图片文件
  const chooseBgImgFile = () => {
    bgImgInput.current?.click()
  }
  // 监听背景图片文件变化
  const bgImgFileChange = () => {
    const file = bgImgInput.current?.files?.[0]
    if (file) {
      if (file.size > MAX_INFO_SIZE) {
        message.error('图片大小不能超过 5MB')
        return
      }
      setBgImgFile(file)
      setBgCropperVisible(true)
    }
  }
  // 确认裁剪背景图片
  const confirmCropBgImg = async (imgURL: string) => {
    try {
      setLoading(true)
      const file = base64ToFile(imgURL, 'bgImg')
      const { data } = await uploadImageAPI({ image: file })
      setEditUserInfo({ ...editUserInfo, backgroundImg: data })
      message.success('修改背景图片成功！')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setBgCropperVisible(false)
    }
  }

  // 当裁剪框消失时，清空背景图片文件
  useEffect(() => {
    if (!bgCropperVisible) setBgImgFile(null)
  }, [bgCropperVisible])

  const avatarInput = useRef<HTMLInputElement | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null) // 头像文件
  const [avatarHovering, setAvatarHovering] = useState(false)
  const [avatarCropperVisible, setAvatarCropperVisible] = useState(false)

  // 选择头像文件
  const chooseAvatarFile = () => {
    avatarInput.current?.click()
  }
  // 监听头像文件变化
  const avatarImgFileChange = () => {
    const file = avatarInput.current?.files?.[0]
    if (file) {
      if (file.size > MAX_INFO_SIZE) {
        message.error('图片大小不能超过 5MB')
        return
      }
      setAvatarFile(file)
      setAvatarCropperVisible(true)
    }
  }
  // 确认裁剪头像图片
  const confirmCropAvatarImg = async (imgURL: string) => {
    try {
      setLoading(true)
      const file = base64ToFile(imgURL, 'bgImg')
      const { data } = await uploadImageAPI({ image: file })
      setEditUserInfo({ ...editUserInfo, avatar: data })
      message.success('修改头像成功！')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setAvatarCropperVisible(false)
    }
  }
  // 当裁剪框消失时，清空头像文件
  useEffect(() => {
    if (!avatarCropperVisible) setAvatarFile(null)
  }, [avatarCropperVisible])

  // 更新用户信息
  const updateUserInfo = async () => {
    try {
      setLoading(true)
      await updateUserInfoAPI(editUserInfo)
      onConfirm()
      message.success('修改个人资料成功！')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }

  return (
    <>
      <Modal title='编辑个人资料' visible={visible} setVisible={setVisible}>
        <>
          <div className='relative w-full h-63'>
            <input type='file' className='hidden' ref={bgImgInput} onChange={bgImgFileChange} />
            {editUserInfo.backgroundImg ? (
              <div
                className='w-full h-full cursor-pointer'
                onMouseEnter={() => setBgHovering(true)}
                onMouseLeave={() => setBgHovering(false)}>
                <CSSTransition
                  in={bgHovering}
                  timeout={300}
                  classNames='opacity-gradient'
                  unmountOnExit>
                  <div
                    className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-32 color-white font-size-14px z-1'
                    onClick={chooseBgImgFile}>
                    <span>重新更改背景图片</span>
                  </div>
                </CSSTransition>
                <img
                  src={editUserInfo.backgroundImg}
                  alt='background'
                  className='w-full h-full object-cover'
                />
              </div>
            ) : (
              <div
                className='bg-#f8f8f8 h-full flex justify-center items-center cursor-pointer'
                onClick={chooseBgImgFile}>
                <div className='flex flex-col items-center color-#858585 font-size-14px font-bold'>
                  <Icon color='#858585' width='48px' icon='ant-design:edit-filled' />
                  <span>上传封面</span>
                </div>
              </div>
            )}
          </div>
          <div className='relative p-5 flex flex-col gap-5'>
            <div className='flex items-center gap-5'>
              <input
                type='file'
                className='hidden'
                ref={avatarInput}
                onChange={avatarImgFileChange}
              />
              <span className='color-#3d3d3d font-size-14px font-bold'>个人头像</span>
              <div
                className='relative w-24 h-24 rd-full overflow-hidden flex justify-center items-center cursor-pointer'
                onMouseEnter={() => setAvatarHovering(true)}
                onMouseLeave={() => setAvatarHovering(false)}>
                <CSSTransition
                  in={avatarHovering}
                  timeout={300}
                  classNames='opacity-gradient'
                  unmountOnExit>
                  <div
                    className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-32 color-white font-size-14px z-1'
                    onClick={chooseAvatarFile}>
                    <span>选择文件</span>
                  </div>
                </CSSTransition>
                <img
                  className='w-full h-full object-cover'
                  src={editUserInfo.avatar}
                  alt='avatar'
                />
              </div>
            </div>
            <div className='flex items-center gap-5'>
              <span className='color-#3d3d3d font-size-14px font-bold'>个人名称</span>
              <Input
                className='w-100'
                placeholder='请输入个人名称'
                value={editUserInfo.username}
                onChange={(e) => setEditUserInfo({ ...editUserInfo, username: e.target.value })}
              />
            </div>
            <div className='flex items-center gap-5'>
              <span className='color-#3d3d3d font-size-14px font-bold'>个人简介</span>
              <TextArea
                className='w-100'
                placeholder='请输入简介~不超过1024个字哦！'
                maxLength={1024}
                showCount
                autoSize={{ minRows: 3, maxRows: 6 }}
                value={editUserInfo.signature}
                onChange={(e) => setEditUserInfo({ ...editUserInfo, signature: e.target.value })}
              />
            </div>
            <div className='flex items-center gap-5'>
              <span className='color-#3d3d3d font-size-14px font-bold'>个人性别</span>
              <Radio.Group
                value={editUserInfo.gender}
                onChange={(e) => setEditUserInfo({ ...editUserInfo, gender: e.target.value })}>
                <Radio value={0}>男孩子</Radio>
                <Radio value={1}>女孩子</Radio>
                <Radio value={2}>保密</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className='m-5 relative flex flex-col gap-5 justify-center items-center'>
            <Button
              className='w-75'
              type='primary'
              shape='round'
              size='large'
              loading={loading}
              onClick={updateUserInfo}>
              确认修改
            </Button>
            <Button
              className='w-75'
              type='default'
              shape='round'
              size='large'
              onClick={() => setVisible(false)}>
              取消修改
            </Button>
          </div>
        </>
      </Modal>

      {/* 裁剪背景图 */}
      <HanaCropper
        loading={loading}
        type='background'
        visible={bgCropperVisible}
        setVisible={setBgCropperVisible}
        imgURL={bgImgFile ? URL.createObjectURL(bgImgFile) : ''}
        onSaveHandler={(imgURL) => confirmCropBgImg(imgURL)}
      />

      {/* 裁剪头像 */}
      <HanaCropper
        loading={loading}
        type='avatar'
        visible={avatarCropperVisible}
        setVisible={setAvatarCropperVisible}
        imgURL={avatarFile ? URL.createObjectURL(avatarFile) : ''}
        onSaveHandler={(imgURL) => confirmCropAvatarImg(imgURL)}
      />
    </>
  )
}

export default EditModal