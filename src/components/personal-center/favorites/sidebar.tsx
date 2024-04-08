import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { FavoriteItemInfo } from '@/utils/types'
import { favoriteList } from '@/test/data'
import FavoriteItem from '@/components/common/favorite-item'
import type { DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { Icon } from '@iconify/react'

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
  const { favoriteId, userId } = useParams()
  const navigate = useNavigate()

  const [folderList, setFolderList] = useState<FavoriteItemInfo[]>(favoriteList)
  const [folderStatusList, setFolderStatusList] = useState<boolean[]>(
    new Array(folderList.length).fill(false),
  )

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
  }

  const onChooseFolder = (id: string) => {
    navigate(`/personal-center/${userId}/favorites/${id}`)
  }

  const onDeleteFolder = (id: string) => {
    console.log('delete folder ' + id)
  }

  const onEditFolder = (id: string) => {
    console.log('edit folder ' + id)
  }

  return (
    <DndContext onDragEnd={dragEndEvent} modifiers={[restrictToParentElement]}>
      <SortableContext
        items={folderList.map((item) => item.id)}
        strategy={verticalListSortingStrategy}>
        <div className='relative h-100% border-r-solid border-1px border-color-#858585'>
          <div
            className='relative flex justify-between items-center w-250px h-15 bg-#fff cursor-pointer hover:bg-#f5f5f5'
            onClick={() => onAddFolder()}>
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
  )
}

export default Sidebar
