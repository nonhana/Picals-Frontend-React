import { FC, useEffect, useState } from 'react'
import type { WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button, Divider, Modal, Radio, RadioChangeEvent, message } from 'antd'
import WorkLittleItem from '@/components/common/work-little-item'
import LayoutList from '@/components/common/layout-list'
import Comments from '../comments'
import { Link } from 'react-router-dom'
import { PhotoView } from 'react-photo-view'
import { useMap } from '@/hooks'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import HanaViewer from '@/components/common/hana-viewer'
import { likeActionsAPI, favoriteActionsAPI, userActionsAPI } from '@/apis'
import Empty from '@/components/common/empty'

type WorkInfoProps = {
  workInfo: WorkDetailInfo
  authorWorkList: WorkNormalItemInfo[]
}

const WorkInfo: FC<WorkInfoProps> = ({
  workInfo: sourceWorkInfo,
  authorWorkList: sourceWorkList,
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const {
    favorite: { favoriteList },
    user: {
      userInfo: { id },
    },
  } = useSelector((state: AppState) => state)

  const [loading, setLoading] = useState(true)
  const [workInfo, setWorkInfo] = useState<WorkDetailInfo>(sourceWorkInfo)
  const [collecting, setCollecting] = useState(false)
  const [folderId, setFolderId] = useState<string>('')

  const [authorWorkList, _, setAuthorWorkList] = useMap<WorkNormalItemInfo>(sourceWorkList)

  // 喜欢当前作品
  const handleLikeWork = async () => {
    await likeActionsAPI({ id: workInfo.id })
    setWorkInfo({
      ...workInfo,
      likeNum: workInfo.isLiked ? workInfo.likeNum - 1 : workInfo.likeNum + 1,
      isLiked: !workInfo.isLiked,
    })
  }

  // 添加当前作品到收藏夹
  const handleCollectWork = async () => {
    if (workInfo.isCollected) {
      await favoriteActionsAPI({ id: workInfo.id, favoriteId: workInfo.favoriteId! })
      setWorkInfo({ ...workInfo, isCollected: false })
    } else {
      setCollecting(true)
    }
  }
  const collectConfirm = async () => {
    if (!folderId) {
      setCollecting(false)
      return
    }
    await favoriteActionsAPI({ id: workInfo.id, favoriteId: folderId })
    setCollecting(false)
    setWorkInfo({ ...workInfo, isCollected: true })
    messageApi.success('收藏成功')
  }
  const cancelCollect = () => {
    setCollecting(false)
    setFolderId('')
  }
  const onChooseFolder = (e: RadioChangeEvent) => {
    setFolderId(e.target.value)
  }

  // 喜欢作品列表中的作品
  const handleLike = (id: string) => {
    setAuthorWorkList(id, { ...authorWorkList.get(id)!, isLiked: !authorWorkList.get(id)!.isLiked })
  }

  // 关注用户
  const handleFollow = async () => {
    try {
      await userActionsAPI({ id: workInfo.authorInfo.id })
      setWorkInfo({
        ...workInfo,
        authorInfo: { ...workInfo.authorInfo, isFollowing: !workInfo.authorInfo.isFollowing },
      })
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {contextHolder}
      <div className='relative bg-#fff rd-6 p-5 w-180 flex flex-col items-center'>
        <div id='work-info' className='w-100%'>
          {/* 图片列表 */}
          <HanaViewer>
            <div className='w-100% flex flex-col gap-10px'>
              {workInfo?.imgList.map((img, index) => (
                <PhotoView key={index} src={img}>
                  <img src={img} alt={`${workInfo.name}-${index}`} />
                </PhotoView>
              ))}
            </div>
          </HanaViewer>
          {/* 操作栏 */}
          <div className='w-100% my-10px flex justify-end'>
            <div className='flex gap-40px'>
              <Icon
                className='cursor-pointer'
                width='32px'
                color={workInfo?.isLiked ? 'red' : '#3d3d3d'}
                icon={workInfo?.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
                onClick={handleLikeWork}
              />
              <Icon
                className='cursor-pointer'
                width='32px'
                color={workInfo?.isCollected ? 'yellow' : '#3d3d3d'}
                icon={workInfo?.isCollected ? 'ant-design:star-filled' : 'ant-design:star-outlined'}
                onClick={handleCollectWork}
              />
              <Icon
                className='cursor-pointer'
                width='32px'
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
            <div className='font-bold font-size-14px color-#6d757a line-height-normal'>
              <span>{workInfo?.intro}</span>
            </div>
            <div className='flex flex-wrap gap-10px font-size-14px'>
              {workInfo?.labels.map((label, index) => (
                <Link to={`/search-result?label=${label.label}&type=work&sortType=new`} key={index}>
                  #{label.label}
                </Link>
              ))}
            </div>
            <div className='flex my-3 gap-20px'>
              <div className='flex items-center gap-10px font-bold font-size-14px color-#858585'>
                <Icon width='16px' color='#858585' icon='ant-design:heart-filled' />
                <span>{workInfo?.likeNum}</span>
              </div>
              <div className='flex items-center gap-10px font-bold font-size-14px color-#858585'>
                <Icon width='16px' color='#858585' icon='ant-design:eye-filled' />
                <span> {workInfo?.viewNum}</span>
              </div>
              <div className='flex items-center gap-10px font-bold font-size-14px color-#858585'>
                <Icon width='16px' color='#858585' icon='ant-design:star-filled' />
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
            <div className='w-150 mb-3 flex justify-between'>
              <div className='flex gap-20px items-center'>
                <Link
                  to={`/personal-center/${workInfo?.authorInfo.id}`}
                  className='w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-14px color-#3d3d3d'>
                  <img
                    className='w-full h-full object-cover'
                    src={workInfo?.authorInfo.avatar}
                    alt={workInfo?.authorInfo.username}
                  />
                </Link>
                <Link className='color-#3d3d3d' to={`/personal-center/${workInfo?.authorInfo.id}`}>
                  {workInfo?.authorInfo.username}
                </Link>
                {workInfo.authorInfo.id !== id && (
                  <Button
                    shape='round'
                    size='large'
                    type={workInfo?.authorInfo.isFollowing ? 'default' : 'primary'}
                    onClick={handleFollow}>
                    {workInfo?.authorInfo.isFollowing ? '已关注' : '关注'}
                  </Button>
                )}
              </div>
              <Link to={`/personal-center/${workInfo?.authorInfo.id}`}>
                <Button shape='round' size='large' type='default'>
                  查看作品列表
                </Button>
              </Link>
            </div>

            {authorWorkList.size === 0 ? (
              <Empty showImg={false} text='暂无其他作品' />
            ) : (
              <LayoutList scrollType='work-normal'>
                {Array.from(authorWorkList.values()).map((work, index) => (
                  <WorkLittleItem key={index} itemInfo={work} like={handleLike} />
                ))}
              </LayoutList>
            )}
          </div>
        </div>
        <Divider />
        {/* 评论 */}
        <Comments loading={loading} />
      </div>

      <Modal
        title='选择想要收藏的收藏夹'
        width='420px'
        open={collecting}
        okText='确认'
        cancelText='取消'
        onOk={() => collectConfirm()}
        onCancel={cancelCollect}>
        {favoriteList.length !== 0 ? (
          <div className='h-110 overflow-y-scroll'>
            <Radio.Group className='w-full' onChange={onChooseFolder} value={folderId}>
              {favoriteList.map((item) => (
                <Radio
                  key={item.id}
                  value={item.id}
                  className='w-full h-15 px-5 flex justify-between items-center'>
                  <div className='w-70 flex justify-between'>
                    <span>{item.name}</span>
                    <span>作品数：{item.workNum}</span>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </div>
        ) : (
          <Empty text='暂无收藏夹，可以先去个人中心创建一个哦！' />
        )}
      </Modal>
    </>
  )
}

export default WorkInfo
