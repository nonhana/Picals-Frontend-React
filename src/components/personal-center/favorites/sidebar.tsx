import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { FavoriteItemInfo, FavoriteFormInfo } from '@/utils/types'
import { favoriteList } from '@/test/data'
import FavoriteItem from '@/components/common/favorite-item'
import type { DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { Icon } from '@iconify/react'
import { Modal, Input, Upload, message, Flex } from 'antd'

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
  const [messageApi, contextHolder] = message.useMessage()

  const { favoriteId, userId } = useParams()
  const navigate = useNavigate()

  const [folderList, setFolderList] = useState<FavoriteItemInfo[]>(favoriteList)
  const [folderStatusList, setFolderStatusList] = useState<boolean[]>(
    new Array(folderList.length).fill(false),
  )
  const [editingFolderId, setEditingFolderId] = useState<string>('')
  const [modalStatus, setModalStatus] = useState(false)
  const [formInfo, setFormInfo] = useState<FavoriteFormInfo>({
    name: '',
    intro: '',
    cover: null,
  })

  useEffect(() => {
    setFolderStatusList(
      folderList.map((item) => {
        return item.id === favoriteId
      }),
    )
  }, [favoriteId])

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
    console.log('add folder')
    setModalStatus(true)
  }

  const onChooseFolder = (id: string) => {
    navigate(`/personal-center/${userId}/favorites/${id}`)
  }

  const onDeleteFolder = (id: string) => {
    Modal.confirm({
      title: '删除收藏集',
      content: '确定删除该收藏集吗？',
      onOk() {
        console.log('delete folder ' + id)
        messageApi.success('删除成功')
      },
    })
  }

  const onEditFolder = (id: string) => {
    setEditingFolderId(id)
    // TODO: 根据id获取收藏夹信息并填充表单
    setModalStatus(true)
  }
  const confirmAction = () => {
    setModalStatus(false)
    setEditingFolderId('')
    setFormInfo({ name: '', intro: '', cover: null })
    messageApi.success('编辑成功')
  }
  const cancelAction = () => {
    setModalStatus(false)
    setEditingFolderId('')
    setFormInfo({ name: '', intro: '', cover: null })
  }

  return (
    <>
      {contextHolder}
      <DndContext onDragEnd={dragEndEvent} modifiers={[restrictToParentElement]}>
        <SortableContext
          items={folderList.map((item) => item.id)}
          strategy={verticalListSortingStrategy}>
          <div className='relative h-100% border-r-solid border-1px border-color-#858585'>
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
            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                console.log(file)
              }}>
              <div className='w-100px h-100px flex justify-center items-center bg-#f5f5f5'>
                <Icon width='24px' color='#858585' icon='ant-design:upload-outlined' />
              </div>
            </Upload>
          </Flex>
        </Flex>
      </Modal>
    </>
  )
}

export default Sidebar
