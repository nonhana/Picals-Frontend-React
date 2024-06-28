import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@/store/types'
import { verifyPixivUser, verifyPixivWork, download } from '@/utils'
import type { FavoriteFormInfo, WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button, Divider, Modal, message, Checkbox } from 'antd'
import type { GetProp } from 'antd'
import WorkLittleItem from '@/components/common/work-little-item'
import LayoutList from '@/components/common/layout-list'
import Comments from '../comments'
import { Link, useNavigate } from 'react-router-dom'
import { PhotoView } from 'react-photo-view'
import HanaViewer from '@/components/common/hana-viewer'
import { favoriteActionsAPI, userActionsAPI, getUserFavoriteListAPI, newFavoriteAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { setFavoriteList } from '@/store/modules/favorites'
import pixiv from '@/assets/svgs/pixiv.svg'
import { decreaseFollowNum, increaseFollowNum } from '@/store/modules/user'
import CreateFolderModal from '@/components/common/create-folder-modal'
import LazyImg from '@/components/common/lazy-img'

const { confirm } = Modal
const CheckboxGroup = Checkbox.Group

type WorkInfoProps = {
  workInfo: WorkDetailInfo
  setWorkInfo: (workInfo: WorkDetailInfo) => void
  authorWorkList: WorkNormalItemInfo[]
  likeWork: (id: string) => void
}

const WorkInfo: FC<WorkInfoProps> = ({ workInfo, setWorkInfo, authorWorkList, likeWork }) => {
  const workIntro = workInfo.intro.split('\n').map((item, index) => (
    <span key={index}>
      {item}
      <br />
    </span>
  ))

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  const { favoriteList } = useSelector((state: AppState) => state.favorite)
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id } = useSelector((state: AppState) => state.user.userInfo)

  const [loading, setLoading] = useState(true)
  const [collecting, setCollecting] = useState(false)
  const [folderIds, setFolderIds] = useState<string[]>([])

  useEffect(() => {
    if (!collecting) {
      setFolderIds(workInfo.favoriteIds || [])
    }
  }, [collecting])

  // 刷新收藏夹列表数据
  const refreshFavoriteList = async () => {
    const { data } = await getUserFavoriteListAPI({ id })
    const list = data.sort((a, b) => a.order - b.order)
    dispatch(setFavoriteList(list))
  }

  const collectConfirm = async () => {
    if (folderIds.length === 0) {
      setCollecting(false)
      return
    }
    await favoriteActionsAPI({ id: workInfo.id, favoriteIds: folderIds })
    await refreshFavoriteList()
    setCollecting(false)
    setWorkInfo({ ...workInfo, isCollected: true, favoriteIds: folderIds })
    messageApi.success('收藏成功')
  }
  const cancelCollect = () => {
    setCollecting(false)
  }
  const onChooseFolder: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    setFolderIds(checkedValues as string[])
  }

  // 关注用户
  const handleFollow = async () => {
    try {
      await userActionsAPI({ id: workInfo.authorInfo.id })
      const prevFollowStatus = workInfo.authorInfo.isFollowing
      if (!prevFollowStatus) {
        dispatch(increaseFollowNum())
      } else {
        dispatch(decreaseFollowNum())
      }
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

  const handleEdit = () => {
    confirm({
      title: '是否要进入编辑页面？',
      content: '进入编辑页，可重新编辑该作品的全部信息',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        navigate(`/upload?type=edit&workId=${workInfo.id}`)
      },
    })
  }

  const [gettingBlob, setGettingBlob] = useState(false)

  // 下载图片函数
  const downloadImg = async (index: number) => {
    if (index < 0 || index >= imgList.length) {
      messageApi.error('无效的图片索引')
      return
    }
    try {
      setGettingBlob(true)
      const downloadLink = imgList[index].replace('images/', 'images%2F')
      const suffix = downloadLink.split('.').pop()!
      const filename = `${workInfo.name}${workInfo.imgList.length > 1 ? `-${index}` : ''}.${suffix}`
      await download(downloadLink, filename)
      messageApi.success(`图片 ${filename} 下载成功`)
    } catch (error) {
      messageApi.error('下载失败，请重试')
      return
    } finally {
      setGettingBlob(false)
    }
  }

  /* ----------新建收藏夹相关---------- */
  const [createFolderModalStatus, setCreateFolderModalStatus] = useState(false)
  const [formInfo, setFormInfo] = useState<FavoriteFormInfo>({
    name: '',
    intro: '',
  })

  const confirmAction = async () => {
    try {
      await newFavoriteAPI(formInfo)
      setCreateFolderModalStatus(false)
      await refreshFavoriteList()
      messageApi.success('新建成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }
  const cancelAction = () => {
    setCreateFolderModalStatus(false)
  }
  useEffect(() => {
    if (!createFolderModalStatus) {
      setFormInfo({ name: '', intro: '' })
    }
  }, [createFolderModalStatus])

  return (
    <>
      {contextHolder}
      <div className='relative bg-#fff rd-6 p-5 w-180 flex flex-col items-center'>
        <div id='work-info' className='w-100%'>
          {/* 图片列表 */}
          {imgListVisible && (
            <HanaViewer onDownload={downloadImg} gettingBlob={gettingBlob}>
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
                  color={workInfo.isLiked ? 'red' : '#3d3d3d'}
                  icon={workInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
                  onClick={() => likeWork(workInfo.id)}
                />
                <Icon
                  className='cursor-pointer'
                  width='32px'
                  color={workInfo.isCollected ? 'yellow' : '#3d3d3d'}
                  icon={
                    workInfo.isCollected ? 'ant-design:star-filled' : 'ant-design:star-outlined'
                  }
                  onClick={() => setCollecting(true)}
                />
                <Icon
                  className='cursor-pointer hidden'
                  width='32px'
                  color='#3d3d3d'
                  icon='ant-design:share-alt-outlined'
                />
                {id === workInfo.authorInfo.id && (
                  <Icon
                    className='cursor-pointer'
                    width='32px'
                    color='#3d3d3d'
                    icon='ant-design:edit-outlined'
                    onClick={handleEdit}
                  />
                )}
              </div>
            </div>
          )}
          {/* 作品信息 */}
          <div className='w-150 mt-10px flex flex-col gap-10px'>
            <div className='font-bold font-size-18px color-#3d3d3d'>
              <span>{workInfo.name}</span>
            </div>
            <div className='font-bold font-size-14px color-#6d757a line-height-normal'>
              <span>{workIntro}</span>
            </div>
            <div className='flex flex-wrap gap-10px font-size-14px'>
              <span className='font-bold color-#0090F0'>
                {workInfo.reprintType === 0
                  ? '原创作品'
                  : workInfo.reprintType === 1
                    ? '转载作品'
                    : '合集作品'}
              </span>
              {workInfo.labels.map((label, index) => (
                <Link to={`/search-result?label=${label.label}&type=work&sortType=new`} key={index}>
                  #{label.label}
                </Link>
              ))}
            </div>
            <div className='flex my-3 gap-20px'>
              <div className='flex items-center gap-10px font-bold font-size-14px color-#6d757a'>
                <Icon width='16px' color='#858585' icon='ant-design:heart-filled' />
                <span>{workInfo.likeNum}</span>
              </div>
              <div className='flex items-center gap-10px font-bold font-size-14px color-#6d757a'>
                <Icon width='16px' color='#858585' icon='ant-design:eye-filled' />
                <span> {workInfo.viewNum}</span>
              </div>
              <div className='flex items-center gap-10px font-bold font-size-14px color-#6d757a'>
                <Icon width='16px' color='#858585' icon='ant-design:star-filled' />
                <span>{workInfo.collectNum}</span>
              </div>
            </div>
            <div className='flex flex-col gap-10px font-size-14px font-bold color-#3d3d3d'>
              <span>发布日期：{workInfo.createdDate}</span>
              <span>更新日期：{workInfo.updatedDate}</span>
            </div>
          </div>
          {/* 用户信息 */}
          <div className='w-100% my-5 flex flex-col gap-10px items-center'>
            <div className='w-150 mb-3 flex justify-between'>
              <div className='flex gap-20px items-center'>
                <Link
                  to={`/personal-center/${workInfo.authorInfo.id}`}
                  className='w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-14px color-#3d3d3d'>
                  <LazyImg src={workInfo.authorInfo.avatar} alt={workInfo.authorInfo.username} />
                </Link>
                <Link className='color-#3d3d3d' to={`/personal-center/${workInfo.authorInfo.id}`}>
                  {workInfo.authorInfo.username}
                </Link>
                {workInfo.authorInfo.id !== id && isLogin && (
                  <Button
                    shape='round'
                    size='large'
                    type={workInfo.authorInfo.isFollowing ? 'default' : 'primary'}
                    onClick={handleFollow}>
                    {workInfo.authorInfo.isFollowing ? '已关注' : '关注'}
                  </Button>
                )}
              </div>
              <Link to={`/personal-center/${workInfo.authorInfo.id}`}>
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
          {workInfo.reprintType !== 0 && (
            <div className='bg-#f5f5f5 relative p-5 w-full'>
              {workInfo.reprintType === 1 && (
                <>
                  <div className='flex justify-between items-center'>
                    <span className='font-size-18px font-bold color-#3d3d3d'>原作品地址</span>
                    {verifyPixivWork(workInfo.workUrl!) && (
                      <img className='w-15' src={pixiv} alt='pixiv' />
                    )}
                  </div>
                  <div className='my-10px flex gap-20px items-center'>
                    <Link to={workInfo.workUrl!} target='_blank'>
                      {workInfo.workUrl}
                    </Link>
                  </div>
                  <Divider />
                </>
              )}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-10px'>
                  <span className='font-size-18px font-bold color-#3d3d3d'>原作者信息</span>
                  <span className='font-size-14px color-#6d757a'>
                    目前收录 {workInfo.illustrator!.workCount} 个作品
                  </span>
                </div>
                {verifyPixivUser(workInfo.illustrator!.homeUrl) && (
                  <img className='w-15' src={pixiv} alt='pixiv' />
                )}
              </div>
              <div className='mt-10px flex items-center justify-between'>
                <div className='flex gap-20px items-center'>
                  {/* <Link
                    to={workInfo.illustrator!.homeUrl}
                    target='_blank'
                    className='relative w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-14px color-#3d3d3d'>
                    <img
                      className='w-full h-full object-cover'
                      src={workInfo.illustrator!.avatar}
                      alt={workInfo.illustrator!.name}
                    />
                  </Link> */}
                  <Link to={workInfo.illustrator!.homeUrl} target='_blank'>
                    {workInfo.illustrator!.name}
                  </Link>
                </div>
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
        onCancel={cancelCollect}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button type='primary' onClick={() => setCreateFolderModalStatus(true)}>
              新建收藏夹
            </Button>
            <CancelBtn />
            <OkBtn />
          </>
        )}>
        {favoriteList.length !== 0 ? (
          <div className='h-110 overflow-y-scroll'>
            <CheckboxGroup className='w-full' onChange={onChooseFolder} value={folderIds}>
              {favoriteList.map((item) => (
                <Checkbox
                  key={item.id}
                  value={item.id}
                  className='w-full h-15 px-5 flex justify-between items-center'>
                  <div className='w-70 flex justify-between'>
                    <span>{item.name}</span>
                    <span>作品数：{item.workNum}</span>
                  </div>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        ) : (
          <Empty text='暂无收藏夹' />
        )}
      </Modal>

      <CreateFolderModal
        editMode={false}
        modalStatus={createFolderModalStatus}
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        confirmAction={confirmAction}
        cancelAction={cancelAction}
      />
    </>
  )
}

export default WorkInfo
