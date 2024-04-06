import { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'

const dropdownList: MenuProps['items'] = [
  {
    key: 'edit',
    label: <span>编辑收藏夹</span>,
  },
  {
    key: 'delete',
    label: <span>删除</span>,
  },
]

type FavoriteItemProps = {
  id: string
  name: string
  folderStatus: boolean
  onChooseFolder: (id: string) => void
  onDeleteFolder: (id: string) => void
  onEditFolder: (id: string) => void
}

const FavoriteItem: FC<FavoriteItemProps> = ({
  id,
  name,
  folderStatus,
  onChooseFolder,
  onDeleteFolder,
  onEditFolder,
}) => {
  const [hovering, setHovering] = useState(false)

  const onChooseItem: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'edit':
        onEditFolder(id)
        break
      case 'delete':
        onDeleteFolder(id)
        break
      default:
        break
    }
  }

  return (
    <div
      className='relative flex justify-between items-center w-250px h-15 bg-#fff cursor-pointer hover:bg-#f5f5f5'
      onClick={() => onChooseFolder(id)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <div className='flex gap-10px items-center font-size-18px font-bold color-#3d3d3d'>
        <div
          style={{ visibility: hovering ? 'visible' : 'hidden' }}
          className='bg-#c0c0c0 w-3 h-15 flex justify-center items-center cursor-all-scroll'>
          <Icon width='8px' color='#fff' icon='heroicons-outline:bars-3' />
        </div>
        <div>
          <Icon
            width='24px'
            color='#858585'
            icon={folderStatus ? 'ant-design:folder-open-filled' : 'ant-design:folder-filled'}
          />
        </div>
        <span>{name}</span>
      </div>
      <Dropdown menu={{ items: dropdownList, onClick: onChooseItem }} placement='bottom' arrow>
        <Icon width='24px' color='#858585' icon='ant-design:more-outlined' />
      </Dropdown>
    </div>
  )
}

export default FavoriteItem
