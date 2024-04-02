import { FC, useEffect, useState } from 'react'
import type { WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button, Divider } from 'antd'
import WorkLittleItem from '@/components/common/work-little-item'
import LayoutList from '@/components/common/layout-list'
import Comments from '../comments'
import { Link } from 'react-router-dom'

type WorkInfoProps = {
  workInfo: WorkDetailInfo
  authorWorkList: WorkNormalItemInfo[]
}

const WorkInfo: FC<WorkInfoProps> = ({ workInfo, authorWorkList }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className='relative bg-#fff rd-6 p-5 w-180 flex flex-col items-center'>
      <div id='work-info' className='w-100%'>
        {/* 图片列表 */}
        <div className='w-100% flex flex-col gap-10px'>
          {workInfo?.imgList.map((img, index) => (
            <div key={index} className='max-h-200 max-w-175'>
              <img
                className='w-full h-full object-cover'
                src={img}
                alt={`${workInfo.name}-${index}`}
              />
            </div>
          ))}
        </div>
        {/* 操作栏 */}
        <div className='w-100% my-10px flex justify-end'>
          <div className='flex gap-10px'>
            <Icon
              className='cursor-pointer'
              width='24px'
              color={workInfo?.isLiked ? 'red' : '#3d3d3d'}
              icon={workInfo?.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
            />
            <Icon
              className='cursor-pointer'
              width='24px'
              color={workInfo?.isCollected ? 'yellow' : '#3d3d3d'}
              icon={workInfo?.isCollected ? 'ant-design:star-filled' : 'ant-design:star-outlined'}
            />
            <Icon
              className='cursor-pointer'
              width='24px'
              color='#3d3d3d'
              icon='ant-design:share-alt-outlined'
            />
          </div>
        </div>
        {/* 作品信息 */}
        <div className='w-150 flex flex-col gap-10px'>
          <div className='font-bold font-size-18px color-#3d3d3d'>
            <span>{workInfo?.name}</span>
          </div>
          <div className='font-bold font-size-14px color-#6d757a'>
            <span>{workInfo?.intro}</span>
          </div>
          <div className='flex flex-wrap gap-10px font-size-14px'>
            {workInfo?.labels.map((label, index) => (
              <Link to={`/label/${label.label}`} key={index}>
                #{label.label}
              </Link>
            ))}
          </div>
          <div className='flex gap-20px'>
            <div className='flex items-center gap-10px font-bold font-size-14px color-#858585'>
              <Icon width='12px' color='#858585' icon='ant-design-heart-filled' />
              <span>{workInfo?.likeNum}</span>
            </div>
            <div className='flex items-center gap-10px font-bold font-size-14px color-#858585'>
              <Icon width='12px' color='#858585' icon='ant-design:eye-filled' />
              <span> {workInfo?.viewNum}</span>
            </div>
            <div className='flex items-center gap-10px font-bold font-size-14px color-#858585'>
              <Icon width='12px' color='#858585' icon='ant-design:star-filled' />
              <span>{workInfo?.collectNum}</span>
            </div>
          </div>
          <div className='flex flex-col gap-10px font-size-14px font-bold color-#3d3d3d'>
            <span>发布日期：{workInfo?.createdDate}</span>
            <span>更新日期：{workInfo?.updatedDate}</span>
          </div>
        </div>
        {/* 用户信息 */}
        <div className='w-100% my-5 flex flex-col gap-10px items-center'>
          <div className='w-150 flex justify-between'>
            <div className='flex gap-10px items-center'>
              <div className='w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-14px color-#3d3d3d'>
                <img
                  className='w-full h-full object-cover'
                  src={workInfo?.authorInfo.avatar}
                  alt={workInfo?.authorInfo.username}
                />
              </div>
              <span>{workInfo?.authorInfo.username}</span>
              <Button
                shape='round'
                size='large'
                type={workInfo?.authorInfo.isFollowed ? 'primary' : 'default'}>
                {workInfo?.authorInfo.isFollowed ? '已关注' : '关注'}
              </Button>
            </div>
            <Button shape='round' size='large' type='default'>
              查看作品列表
            </Button>
          </div>

          <LayoutList scrollType='work-normal'>
            {authorWorkList.map((work, index) => (
              <WorkLittleItem key={index} itemInfo={work} />
            ))}
          </LayoutList>
        </div>
      </div>
      <Divider />
      {/* 评论 */}
      <Comments loading={loading} />
    </div>
  )
}

export default WorkInfo
