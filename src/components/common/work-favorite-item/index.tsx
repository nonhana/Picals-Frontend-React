import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import type { WorkFavoriteItemInfo } from '@/utils/types'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'

const dropdownList: MenuProps['items'] = [
  {
    key: 'cancel',
    label: <span>取消收藏</span>,
  },
  {
    key: 'move',
    label: <span>移动到</span>,
  },
  {
    key: 'copy',
    label: <span>复制到</span>,
  },
]

type WorkFavoriteItemProps = {
  itemInfo: WorkFavoriteItemInfo
  settingStatus: boolean // 是否正处于批量编辑状态
  chooseStatus: boolean // 是否被选中
  like: (id: string) => void
  choose: (id: string) => void
  cancel: (id: string) => void
  move: (id: string) => void
  copy: (id: string) => void
}

const WorkFavoriteItem: FC<WorkFavoriteItemProps> = ({
  itemInfo,
  like,
  settingStatus,
  chooseStatus,
  choose,
  cancel,
  move,
  copy,
}) => {
  const navigate = useNavigate()

  const onChooseItem: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'cancel':
        cancel(itemInfo.id)
        break
      case 'move':
        move(itemInfo.id)
        break
      case 'copy':
        copy(itemInfo.id)
        break
      default:
        break
    }
  }

  return (
    <div
      className={`shrink-0 relative w-184px rd-1 overflow-hidden ${chooseStatus ? 'bg-#f5f5f5' : 'bg-white'} ${settingStatus ? 'hover:bg-#f5f5f5' : ''}`}>
      {settingStatus && (
        <div
          className='absolute top-0 left-0 w-184px h-full z-100'
          onClick={() => choose(itemInfo.id)}>
          <div className='absolute top-10px right-10px'>
            <Icon
              width='32px'
              color={chooseStatus ? '#0090F0' : '#fff'}
              icon={
                chooseStatus ? 'ant-design:check-square-filled' : 'ant-design:check-square-outlined'
              }
            />
          </div>
        </div>
      )}

      <div className='absolute top-0 left-0 w-184px h-184px z-99'>
        <div
          onClick={() => navigate(`/work-detail/${itemInfo.id}`)}
          className='cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-184px h-184px'
        />
        {itemInfo.imgList.length > 1 && (
          <div className='absolute top-10px right-10px'>
            <div className='rd-full absolute w-full h-full bg-black opacity-8 z--1' />
            <div className='px-2 py-1 flex items-center gap-1'>
              <Icon width='12px' color='#ffffff' icon='ant-design:file-filled' />
              <span className='font-size-10px color-white'>{itemInfo.imgList.length}</span>
            </div>
          </div>
        )}
        <Icon
          className='absolute bottom-10px right-10px cursor-pointer'
          width='24px'
          color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
          icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
          onClick={() => like(itemInfo.id)}
        />
      </div>

      <div className='relative w-184px h-184px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>

      <div className='relative p-10px flex flex-col gap-5px'>
        <div className='cursor-pointer font-size-14px color-#3d3d3d font-bold'>
          <span>{itemInfo.name}</span>
        </div>

        <div className='w-full flex justify-between '>
          <div className='flex items-center gap-10px font-size-14px color-#6d757a'>
            <div className='cursor-pointer w-6 h-6 rd-full overflow-hidden flex items-center justify-center'>
              <img
                className='w-full h-full object-cover'
                src={itemInfo.authorAvatar}
                alt={itemInfo.authorName}
              />
            </div>
            <span className='cursor-pointer'>{itemInfo.authorName}</span>
          </div>
          <Dropdown menu={{ items: dropdownList, onClick: onChooseItem }} placement='bottom' arrow>
            <Icon width='24px' color='#858585' icon='ant-design:more-outlined' />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default WorkFavoriteItem