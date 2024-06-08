import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@/store/types'
import type { WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button, Divider, Modal, Radio, RadioChangeEvent, message } from 'antd'
import WorkLittleItem from '@/components/common/work-little-item'
import LayoutList from '@/components/common/layout-list'
import Comments from '../comments'
import { Link } from 'react-router-dom'
import { PhotoView } from 'react-photo-view'
import HanaViewer from '@/components/common/hana-viewer'
import { favoriteActionsAPI, userActionsAPI, getUserFavoriteListAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { setFavoriteList } from '@/store/modules/favorites'
import pixiv from '@/assets/svgs/pixiv.svg'
import { verifyPixivUser, verifyPixivWork } from '@/utils'

type WorkInfoProps = {
  workInfo: WorkDetailInfo
  setWorkInfo: (workInfo: WorkDetailInfo) => void
  authorWorkList: WorkNormalItemInfo[]
  likeWork: (id: string) => void
}

const WorkInfo: FC<WorkInfoProps> = ({ workInfo, setWorkInfo, authorWorkList, likeWork }) => {
  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  const { favoriteList } = useSelector((state: AppState) => state.favorite)
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id } = useSelector((state: AppState) => state.user.userInfo)

  const [loading, setLoading] = useState(true)
  const [collecting, setCollecting] = useState(false)
  const [folderId, setFolderId] = useState<string>('')

  // 刷新收藏夹列表数据
  const refreshFavoriteList = async () => {
    const { data } = await getUserFavoriteListAPI({ id })
    dispatch(setFavoriteList(data))
  }

  // 添加当前作品到收藏夹
  const handleCollectWork = async () => {
    if (workInfo.isCollected) {
      await favoriteActionsAPI({ id: workInfo.id, favoriteIds: workInfo.favoriteIds! })
      await refreshFavoriteList()
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
    await favoriteActionsAPI({ id: workInfo.id, favoriteIds: [folderId] })
    await refreshFavoriteList()
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

  // 关注用户
  const handleFollow = async () => {
    try {
      await userActionsAPI({ id: workInfo.authorInfo.id })
      setWorkInfo({
        ...workInfo,
        authorInfo: { ...workInfo.authorInfo, isFollowing: !workInfo.authorInfo.isFollowing },
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // 防止图片列表预览组件因图片列表获取不完全而出现显示错误（setXxx是异步的）
  const [imgList, setImgList] = useState<string[]>([])
  const [imgListVisible, setImgListVisible] = useState(false)

  useEffect(() => {
    setImgListVisible(false)
    setImgList(workInfo.imgList)
  }, [workInfo.imgList])

  useEffect(() => {
    setImgListVisible(true)
  }, [imgList])

  return (
    <>
      {contextHolder}
      <div className='relative bg-#fff rd-6 p-5 w-180 flex flex-col items-center'>
        <div id='work-info' className='w-100%'>
          {/* 图片列表 */}
          {imgListVisible && (
            <HanaViewer>
              <div className='w-100% flex flex-col gap-10px'>
                {imgList.map((img, index) => (
                  <PhotoView key={index} src={img}>
                    <img src={img} alt={`${workInfo.name}-${index}`} />
                  </PhotoView>
                ))}
              </div>
            </HanaViewer>
          )}
          {/* 操作栏 */}
          {isLogin && (
            <div className='w-100% mt-10px flex justify-end'>
              <div className='flex gap-40px'>
                <Icon
                  className='cursor-pointer'
                  width='32px'
                  color={workInfo?.isLiked ? 'red' : '#3d3d3d'}
                  icon={workInfo?.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
                  onClick={() => likeWork(workInfo.id)}
                />
                <Icon
                  className='cursor-pointer'
                  width='32px'
                  color={workInfo?.isCollected ? 'yellow' : '#3d3d3d'}
                  icon={
                    workInfo?.isCollected ? 'ant-design:star-filled' : 'ant-design:star-outlined'
                  }
                  onClick={handleCollectWork}
                />
                <Icon
                  className='cursor-pointer hidden'
                  width='32px'
                  color='#3d3d3d'
                  icon='ant-design:share-alt-outlined'
                />
              </div>
            </div>
          )}
          {/* 作品信息 */}
          <div className='w-150 mt-10px flex flex-col gap-10px'>
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
                {workInfo.authorInfo.id !== id && isLogin && (
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

            {authorWorkList.length === 0 ? (
              <Empty showImg={false} text='暂无其他作品' />
            ) : (
              <LayoutList scrollType='work-normal'>
                {Array.from(authorWorkList.values()).map((work, index) => (
                  <WorkLittleItem key={index} itemInfo={work} like={likeWork} />
                ))}
              </LayoutList>
            )}
          </div>
          {/* 原作信息 */}
          {workInfo.isReprinted && (
            <div className='bg-#f5f5f5 relative p-5 w-full'>
              <div className='flex gap-10px items-center'>
                <span className='font-size-18px font-bold color-#3d3d3d'>原作品地址</span>
              </div>
              <div className='my-10px flex gap-20px items-center'>
                <Link to={workInfo.workUrl!} target='_blank'>
                  {workInfo.workUrl}
                </Link>
                {verifyPixivWork(workInfo.workUrl!) && (
                  <img className='w-15' src={pixiv} alt='pixiv' />
                )}
              </div>
              <div className='flex gap-10px items-center'>
                <span className='font-size-18px font-bold color-#3d3d3d'>原作者信息</span>
                <span className='font-size-14px color-#6d757a'>
                  目前共有{workInfo.illustrator!.workCount}个作品
                </span>
              </div>
              <div className='mt-10px flex gap-20px items-center'>
                <Link
                  to={workInfo.illustrator!.homeUrl}
                  target='_blank'
                  className='w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-14px color-#3d3d3d'>
                  <img
                    className='w-full h-full object-cover'
                    src={workInfo.illustrator!.avatar}
                    alt={workInfo.illustrator!.name}
                  />
                </Link>
                <Link className='color-#3d3d3d' to={workInfo.illustrator!.homeUrl} target='_blank'>
                  {workInfo.illustrator!.name}（点击前往个人主页）
                </Link>
                {verifyPixivUser(workInfo.illustrator!.homeUrl) && (
                  <img className='w-15' src={pixiv} alt='pixiv' />
                )}
              </div>
            </div>
          )}
        </div>
        {isLogin &&
          (workInfo.openComment ? (
            <>
              <Divider />
              {/* 评论 */}
              <Comments loading={loading} totalCount={workInfo.commentNum} />
            </>
          ) : (
            <Empty showImg={false} text='该用户已关闭评论' />
          ))}
      </div>

      <Modal
        className='not-show-scrollbar '
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
