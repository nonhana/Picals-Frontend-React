import { FC, useEffect, useState } from 'react'
import type { WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button, Divider } from 'antd'
import WorkLittleItem from '@/components/common/work-little-item'
import LayoutList from '@/components/common/layout-list'
import Comments from '../comments'
import { Link } from 'react-router-dom'
import { PhotoProvider, PhotoView } from 'react-photo-view'

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
    <>
      <div className='relative bg-#fff rd-6 p-5 w-180 flex flex-col items-center'>
        <div id='work-info' className='w-100%'>
          {/* 图片列表 */}
          <PhotoProvider
            toolbarRender={({ onScale, scale }) => {
              return (
                <>
                  <svg
                    className='PhotoView-Slider__toolbarIcon'
                    onClick={() => onScale(scale + 1)}
                    xmlns='http://www.w3.org/2000/svg'
                    width='44'
                    height='44'
                    viewBox='0 0 1024 1024'>
                    <path
                      fill='currentColor'
                      d='M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8m284 424L775 721c122.1-148.9 113.6-369.5-26-509c-148-148.1-388.4-148.1-537 0c-148.1 148.6-148.1 389 0 537c139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11M696 696c-118.8 118.7-311.2 118.7-430 0c-118.7-118.8-118.7-311.2 0-430c118.8-118.7 311.2-118.7 430 0c118.7 118.8 118.7 311.2 0 430'
                    />
                  </svg>
                  <svg
                    className='PhotoView-Slider__toolbarIcon'
                    onClick={() => onScale(scale - 1)}
                    xmlns='http://www.w3.org/2000/svg'
                    width='44'
                    height='44'
                    viewBox='0 0 1024 1024'>
                    <path
                      fill='currentColor'
                      d='M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8m284 424L775 721c122.1-148.9 113.6-369.5-26-509c-148-148.1-388.4-148.1-537 0c-148.1 148.6-148.1 389 0 537c139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11M696 696c-118.8 118.7-311.2 118.7-430 0c-118.7-118.8-118.7-311.2 0-430c118.8-118.7 311.2-118.7 430 0c118.7 118.8 118.7 311.2 0 430'
                    />
                  </svg>
                </>
              )
            }}>
            <div className='w-100% flex flex-col gap-10px'>
              {workInfo?.imgList.map((img, index) => (
                <PhotoView key={index} src={img}>
                  <img src={img} alt={`${workInfo.name}-${index}`} />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
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
    </>
  )
}

export default WorkInfo
