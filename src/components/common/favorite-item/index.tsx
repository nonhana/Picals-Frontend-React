import { PersonalContext } from '@/pages/personal-center'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import { Dropdown, type MenuProps } from 'antd'
import { FC, useState, useContext } from 'react'

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
  const { isMe } = useContext(PersonalContext)

  const [hovering, setHovering] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id,
    transition: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
      ref={setNodeRef}
      {...attributes}
      style={styles}
      className={`relative flex justify-between items-center w-250px h-15 cursor-pointer hover:bg-#f5f5f5 ${folderStatus ? 'bg-#f5f5f5' : 'bg-#fff'}`}
      onClick={() => onChooseFolder(id)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <div className='w-full flex gap-10px items-center font-size-18px font-bold color-#3d3d3d'>
        {isMe && (
          <div
            {...listeners}
            style={{ visibility: hovering ? 'visible' : 'hidden' }}
            className='bg-#c0c0c0 w-3 h-15 flex justify-center items-center cursor-all-scroll'>
            <Icon width='8px' color='#fff' icon='heroicons-outline:bars-3' />
          </div>
        )}
        <div className={`${isMe ? '' : 'pl-3'}`}>
          <Icon
            width='24px'
            color='#858585'
            icon={folderStatus ? 'ant-design:folder-open-filled' : 'ant-design:folder-filled'}
          />
        </div>
        <span className='w-39 whitespace-nowrap overflow-hidden text-ellipsis'>{name}</span>
      </div>
      {isMe && (
        <Dropdown menu={{ items: dropdownList, onClick: onChooseItem }} placement='bottom' arrow>
          <Icon className='mr-5' width='24px' color='#858585' icon='ant-design:more-outlined' />
        </Dropdown>
      )}
    </div>
  )
}

export default FavoriteItem
