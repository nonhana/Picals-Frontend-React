import { FC, useState } from 'react'
import { favoriteList } from '@/test/data'
import FavoriteItem from '@/components/common/favorite-item'

const Sidebar: FC = () => {
  const [folderStatusList, setFolderStatusList] = useState<boolean[]>(
    new Array(favoriteList.length).fill(false),
  )

  const onChooseFolder = (id: string) => {
    setFolderStatusList((prev) =>
      prev.map((item, index) =>
        index === favoriteList.findIndex((item) => item.id === id) ? !item : false,
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
    <div>
      {favoriteList.map((item, index) => (
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
  )
}

export default Sidebar
