import { FC, useState } from 'react'
import type { FavoriteItemInfo } from '@/utils/types'
import { favoriteList } from '@/test/data'
import FavoriteItem from '@/components/common/favorite-item'
import type { DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'

const getMoveIndex = (array: FavoriteItemInfo[], dragItem: DragMoveEvent) => {
  console.log(dragItem)
  const { active, over } = dragItem
  let activeIndex = 0
  let overIndex = 0
  try {
    // 遍历数组，查找出active和over的index
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
  const [folderList, setFolderList] = useState<FavoriteItemInfo[]>(favoriteList)
  const [folderStatusList, setFolderStatusList] = useState<boolean[]>(
    new Array(favoriteList.length).fill(false),
  )

  // 拖拽结束后的操作
  const dragEndEvent = (dragItem: DragEndEvent) => {
    setFolderList((prevDataList) => {
      const moveDataList = [...prevDataList]
      const { activeIndex, overIndex } = getMoveIndex(moveDataList, dragItem)
      const newDataList = arrayMove(moveDataList, activeIndex, overIndex)
      return newDataList
    })
  }

  const onChooseFolder = (id: string) => {
    setFolderStatusList((prev) =>
      prev.map((item, index) =>
        index === folderList.findIndex((item) => item.id === id) ? !item : false,
      ),
    )
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
      </SortableContext>
    </DndContext>
  )
}

export default Sidebar
