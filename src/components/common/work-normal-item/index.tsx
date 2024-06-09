import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { Icon } from '@iconify/react'
import type { WorkNormalItemInfo } from '@/utils/types'
import { PersonalContext } from '@/pages/personal-center'
import { Dropdown, Modal, type MenuProps } from 'antd'

const { confirm } = Modal

const dropdownList: MenuProps['items'] = [
  {
    key: 'delete',
    label: <span>删除作品</span>,
  },
  {
    key: 'edit',
    label: <span>编辑作品</span>,
  },
]

type WorkNormalItemProps = {
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
  deleteWork?: (id: string) => void
}

const WorkNormalItem: FC<WorkNormalItemProps> = ({ itemInfo, like, deleteWork }) => {
  const { userId, currentPath } = useContext(PersonalContext)

  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id: localUserId } = useSelector((state: AppState) => state.user.userInfo)

  // 选择菜单项的选项
  const onChooseItem: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'delete':
        handleDelete(itemInfo.id)
        break
      case 'edit':
        console.log('编辑作品')
        break
      default:
        break
    }
  }

  const handleDelete = (id: string) => {
    confirm({
      title: '删除作品',
      content: '确定要删除这个作品吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteWork && deleteWork(id)
      },
    })
  }

  return (
    <div className='shrink-0 relative w-184px rd-1 bg-white overflow-hidden'>
      <div className='absolute top-0 left-0 w-184px h-184px z-99'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
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
        {isLogin && (
          <Icon
            className='p-10px absolute bottom-0 right-0 cursor-pointer'
            width='44px'
            color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
            icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
            onClick={() => like(itemInfo.id)}
          />
        )}
      </div>

      <div className='relative w-184px h-184px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>

      <div className='relative p-10px flex flex-col gap-5px'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
          className='w-full cursor-pointer font-size-14px color-#3d3d3d font-bold whitespace-nowrap overflow-hidden text-ellipsis inline-block'>
          <span>{itemInfo.name}</span>
        </Link>
        <div className='w-full flex justify-between '>
          <div className='flex items-center gap-10px font-size-14px color-#6d757a'>
            <Link
              to={`/personal-center/${itemInfo.authorId}/works`}
              className='cursor-pointer w-6 h-6 rd-full overflow-hidden flex items-center justify-center'>
              <img
                className='w-full h-full object-cover'
                src={itemInfo.authorAvatar}
                alt={itemInfo.authorName}
              />
            </Link>
            <Link
              to={`/personal-center/${itemInfo.authorId}/works`}
              className='cursor-pointer color-#3d3d3d'>
              <span>{itemInfo.authorName}</span>
            </Link>
          </div>
          {isLogin && userId === localUserId && currentPath === 'works' && (
            <Dropdown
              menu={{ items: dropdownList, onClick: onChooseItem }}
              placement='bottom'
              arrow>
              <Icon width='24px' color='#858585' icon='ant-design:more-outlined' />
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkNormalItem
