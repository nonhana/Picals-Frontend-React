import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import type { FavoriteItemInfo, FavoriteFormInfo } from '@/utils/types'
import FavoriteItem from '@/components/common/favorite-item'
import type { DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { Icon } from '@iconify/react'
import { Modal, Input, Upload, message, Flex, type UploadProps, notification } from 'antd'
import { getUserFavoriteListAPI, newFavoriteAPI, deleteFavoriteAPI, editFavoriteAPI } from '@/apis'
import { setFavoriteList } from '@/store/modules/favorites'
import { CSSTransition } from 'react-transition-group'

// 获取拖动元素的索引
const getMoveIndex = (array: FavoriteItemInfo[], dragItem: DragMoveEvent) => {
  const { active, over } = dragItem
  let activeIndex = 0 // 拖动元素的索引
  let overIndex = 0 // 被拖动元素的索引
  try {
    array.forEach((item, index) => {
      if (active.id === item.id) {
        activeIndex = index
      }
      if (over!.id === item.id) {
        overIndex = index
      }
    })
  } catch (error) {
    overIndex = activeIndex // 如果有问题，则复位
  }
  return { activeIndex, overIndex }
}

const Sidebar: FC = () => {
  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage()
  const { userId } = useParams()
  const [searchParams] = useSearchParams()
  const folderId = searchParams.get('folderId')
  const navigate = useNavigate()

  const [folderList, setFolderList] = useState<FavoriteItemInfo[]>([])
  const fetchFavoriteList = async () => {
    try {
      const { data } = await getUserFavoriteListAPI({ id: userId! })
      dispatch(setFavoriteList(data))
      setFolderList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }
  useEffect(() => {
    fetchFavoriteList()
  }, [userId])

  const [folderStatusList, setFolderStatusList] = useState<boolean[]>(
    new Array(folderList.length).fill(false),
  )
  useEffect(() => {
    if (folderId) setFolderStatusList(folderList.map((item) => item.id === folderId))
  }, [folderId, folderList])
  const [editingFolderId, setEditingFolderId] = useState<string>('')
  const [modalStatus, setModalStatus] = useState(false)
  const [formInfo, setFormInfo] = useState<FavoriteFormInfo>({
    name: '',
    intro: '',
  })

  // 拖拽结束后的操作
  const dragEndEvent = (dragItem: DragEndEvent) => {
    setFolderList((prevDataList) => {
      const moveDataList = [...prevDataList]
      const { activeIndex, overIndex } = getMoveIndex(moveDataList, dragItem)
      const newDataList = arrayMove(moveDataList, activeIndex, overIndex)
      return newDataList
    })
  }

  const onAddFolder = () => {
    setModalStatus(true)
  }

  const onChooseFolder = (id: string) => {
    navigate(`/personal-center/${userId}/favorites?folderId=${id}`)
  }

  const onDeleteFolder = (id: string) => {
    Modal.confirm({
      title: '删除收藏集',
      content: '确定删除该收藏集吗？',
      async onOk() {
        try {
          await deleteFavoriteAPI({ id })
          navigate(`/personal-center/${userId}/favorites`)
          fetchFavoriteList()
          messageApi.success('删除成功')
        } catch (error) {
          console.log('出现错误了喵！！', error)
          return
        }
      },
    })
  }

  const onEditFolder = (id: string) => {
    setEditingFolderId(id)
    const target = folderList.find((item) => item.id === id)
    if (target) {
      const info: FavoriteFormInfo = { name: target.name, intro: target.intro }
      if (target.cover) info.cover = target.cover
      setFormInfo(info)
    }
    setModalStatus(true)
  }
  const confirmAction = async () => {
    try {
      if (editingFolderId !== '') {
        await editFavoriteAPI({ id: editingFolderId, ...formInfo })
      } else {
        await newFavoriteAPI(formInfo)
      }
      setModalStatus(false)
      fetchFavoriteList()
      messageApi.success(editingFolderId !== '' ? '编辑成功' : '新建成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }
  const cancelAction = () => {
    setModalStatus(false)
  }
  useEffect(() => {
    if (!modalStatus) {
      setFormInfo({ name: '', intro: '' })
      setEditingFolderId('')
    }
  }, [modalStatus])

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

  const [imgHovering, setImgHovering] = useState(false)

  const handleRemoveImg = () => {
    delete formInfo.cover
    setImgHovering(false)
  }

  return (
    <>
      {contextHolder}
      <DndContext onDragEnd={dragEndEvent} modifiers={[restrictToParentElement]}>
        <SortableContext
          items={folderList.map((item) => item.id)}
          strategy={verticalListSortingStrategy}>
          <div className='relative h-100%'>
            <div
              className='relative flex justify-between items-center w-250px h-15 bg-#fff cursor-pointer hover:bg-#f5f5f5'
              onClick={onAddFolder}>
              <div className='ml-5 flex gap-10px items-center font-size-18px font-bold color-#3d3d3d'>
                <Icon width='24px' color='#858585' icon='ant-design:plus-circle-outlined' />
                <span>新建收藏集</span>
              </div>
            </div>
            {folderList.map((item, index) => (
              <FavoriteItem
                key={item.id}
                id={item.id}
                name={item.name}
                folderStatus={folderStatusList[index]}
                onChooseFolder={onChooseFolder}
                onDeleteFolder={onDeleteFolder}
                onEditFolder={onEditFolder}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Modal
        title={editingFolderId !== '' ? '编辑收藏夹' : '新建收藏夹'}
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
                <CSSTransition
                  in={imgHovering}
                  timeout={300}
                  classNames='opacity-gradient'
                  unmountOnExit>
                  <div
                    className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-32 color-white font-size-14px z-1'
                    onClick={handleRemoveImg}>
                    <span>移除图片</span>
                  </div>
                </CSSTransition>
                <img
                  className='w-full h-full object-cover'
                  src={formInfo.cover}
                  alt={formInfo.cover}
                />
              </div>
            ) : (
              <Upload {...uploadProps}>
                <div className='w-100px h-100px flex justify-center items-center bg-#f5f5f5'>
                  <Icon width='24px' color='#858585' icon='ant-design:upload-outlined' />
                </div>
              </Upload>
            )}
          </Flex>
        </Flex>
      </Modal>
    </>
  )
}

export default Sidebar
