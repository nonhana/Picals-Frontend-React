import { favoriteActionsAPI, userActionsAPI, getUserFavoriteListAPI, newFavoriteAPI } from '@/apis'
import type { ImageItem } from '@/apis/types'
import pixiv from '@/assets/svgs/pixiv.svg'
import CreateFolderModal from '@/components/common/create-folder-modal'
import Empty from '@/components/common/empty'
import HanaViewer from '@/components/common/hana-viewer'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'
import LazyImg from '@/components/common/lazy-img'
import WorkItem from '@/components/common/work-item'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { setFavoriteList } from '@/store/modules/favorites'
import { decreaseFollowNum, increaseFollowNum } from '@/store/modules/user'
import { setCurrentList } from '@/store/modules/viewList'
import { AppState } from '@/store/types'
import { verifyPixivUser, verifyPixivWork, download } from '@/utils'
import type { FavoriteFormInfo, WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button, Divider, Modal, message, Checkbox } from 'antd'
import type { GetProp } from 'antd'
import { FC, useEffect, useState } from 'react'
import { PhotoView } from 'react-photo-view'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import Comments from '../comments'
import AnimatedDiv from '@/components/motion/animated-div'

const CheckboxGroup = Checkbox.Group

type WorkInfoProps = {
  workId: string
  workInfo: WorkDetailInfo
  setWorkInfo: (workInfo: WorkDetailInfo) => void
  authorWorkList: {
    page: number
    list: WorkNormalItemInfo[]
  }[]
  initializing: boolean
  setInitializing: (status: boolean) => void
  likeWork: (id: string) => void
  setAuthorWorkListEnd: (status: boolean) => void
  isFinal: boolean
}

const WorkStatusMark: FC<{ status: number }> = ({ status }) => {
  switch (status) {
    case 0:
      return (
        <span className='flex items-center gap-5px px-2 b-solid b-2px rd-full font-size-m color-primary'>
          原创作品
          <Icon width={24} color='#0090F0' icon='material-symbols:edit-outline' />
        </span>
      )
    case 1:
      return (
        <span className='flex items-center gap-5px px-2 b-solid b-2px rd-full font-size-m color-primary'>
          转载作品
          <Icon width={24} color='#0090F0' icon='material-symbols:school-outline' />
        </span>
      )
    case 2:
      return (
        <span className='flex items-center gap-5px px-2 b-solid b-2px rd-full font-size-m color-primary'>
          合集作品
          <Icon width={24} color='#0090F0' icon='material-symbols:book-outline' />
        </span>
      )
  }
}

const WorkInfo: FC<WorkInfoProps> = ({
  workId,
  workInfo,
  setWorkInfo,
  authorWorkList,
  initializing,
  setInitializing,
  likeWork,
  setAuthorWorkListEnd,
  isFinal,
}) => {
  const workIntro = workInfo.intro
    ? workInfo.intro.split('\n').map((item, index) => (
        <span key={index}>
          {item}
          <br />
        </span>
      ))
    : '暂无介绍'

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [messageApi, msgContextHolder] = message.useMessage()

  const { favoriteList } = useSelector((state: AppState) => state.favorite)
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id } = useSelector((state: AppState) => state.user.userInfo)
  const { currentList } = useSelector((state: AppState) => state.viewList)

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
    const list = data.sort(({ order: o1 }, { order: o2 }) => o1 - o2)
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

  // 防止图片列表预览组件因图片列表获取不完全而出现显示错误（setXxx是异步的）
  const [imgList, setImgList] = useState<ImageItem[]>([])
  const [imgListVisible, setImgListVisible] = useState(false)

  useEffect(() => {
    setImgList([])
    setImgListVisible(false)
    const result: ImageItem[] = []
    workInfo.imgList.forEach((imgUrl) => {
      const img = workInfo.images.find((item) => item.originUrl === imgUrl)
      if (img) result.push(img)
    })
    setImgList(result)
  }, [workInfo.images])

  useEffect(() => {
    setImgListVisible(true)
  }, [imgList])

  const [modal, modalContextHolder] = Modal.useModal()
  const handleEdit = () => {
    modal.confirm({
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
      const downloadLink = imgList[index].originUrl.replace('images/', 'images%2F')
      const suffix = downloadLink.split('.').pop()!
      const filename = `${workInfo.name}${workInfo.imgList.length > 1 ? `-${index}` : ''}.${suffix}`
      await download(downloadLink, filename)
      messageApi.success(`图片 ${filename} 下载成功`)
    } catch {
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
      console.error('出现错误了喵！！', error)
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

  /* ----------键盘上下案件进行图片顶部固定切换---------- */
  const [imgIndex, setImgIndex] = useState<number | undefined>()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
        ((imgIndex !== undefined && imgIndex > 0) ||
          (imgIndex !== undefined && imgIndex < imgList.length - 1) ||
          imgIndex === undefined)
      )
        event.preventDefault()

      if (event.key === 'ArrowUp') {
        if (imgIndex !== undefined) {
          setImgIndex((prev) => (prev! >= imgList.length ? imgList.length - 1 : prev! - 1))
        }
      } else if (event.key === 'ArrowDown') {
        if (imgIndex === undefined) {
          setImgIndex(0)
        } else {
          setImgIndex((prev) => (prev! < 0 ? 0 : prev! + 1))
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [imgIndex, imgList.length])

  useEffect(() => {
    if (imgIndex !== undefined && imgIndex >= 0 && imgIndex < imgList.length) {
      const imgElement = document.getElementById(imgList[imgIndex].id)
      const top = imgElement?.getBoundingClientRect().top
      const scrollDistance = document.body.scrollTop
      if (top !== undefined) {
        document.body.scrollTo(0, scrollDistance + top)
      }
    }
  }, [imgIndex, workInfo.imgList])

  const addUserWorks = () => {
    dispatch(setCurrentList('userWorkList'))
  }

  return (
    <>
      {msgContextHolder}
      {modalContextHolder}

      <div className='relative bg-white rd-6 p-5 w-180 flex flex-col items-center overflow-hidden'>
        <div id='work-info' className='w-full'>
          {/* 图片列表 */}
          {imgListVisible && (
            <HanaViewer onDownload={downloadImg} gettingBlob={gettingBlob}>
              <div
                style={{
                  width: 'calc(100% + 40px)',
                }}
                className='w-full flex m--5 mb-0 flex-col gap-10px items-center'>
                {imgList.map((img) => (
                  <PhotoView key={img.id} src={img.originUrl}>
                    <img
                      id={img.id}
                      className='max-w-full max-h-200 object-contain cursor-pointer'
                      style={{
                        width: img.thumbnailWidth || '100%',
                        height:
                          (img.thumbnailWidth > 720
                            ? (img.thumbnailHeight * 720) / img.thumbnailWidth
                            : img.thumbnailHeight) || 'auto',
                      }}
                      src={img.thumbnailUrl}
                      alt={`work-${img.id}`}
                    />
                  </PhotoView>
                ))}
              </div>
            </HanaViewer>
          )}
          {/* 操作栏 */}
          {isLogin && (
            <div className='w-full my-5 flex justify-between'>
              <WorkStatusMark status={workInfo.reprintType} />
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
          <div className='mt-10px flex flex-col gap-10px'>
            <div className='flex gap-10px items-center'>
              <span className='font-bold font-size-18px color-shallowblack'>
                {workInfo.name || '无题'}
              </span>
            </div>
            <div className='py-10px font-size-m color-deepgrey line-height-normal'>
              <span>{workIntro}</span>
            </div>
            <LayoutList scrollType='label'>
              {workInfo.labels.map((label) => (
                <LabelItem key={label.id} {...label} />
              ))}
            </LayoutList>
            <div className='flex justify-between items-start my-3'>
              <div className='flex gap-20px'>
                <div className='flex items-center gap-10px font-bold font-size-m color-deepgrey'>
                  <Icon width='16px' color='#858585' icon='ant-design:heart-filled' />
                  <span>{workInfo.likeNum}</span>
                </div>
                <div className='flex items-center gap-10px font-bold font-size-m color-deepgrey'>
                  <Icon width='16px' color='#858585' icon='ant-design:eye-filled' />
                  <span> {workInfo.viewNum}</span>
                </div>
                <div className='flex items-center gap-10px font-bold font-size-m color-deepgrey'>
                  <Icon width='16px' color='#858585' icon='ant-design:star-filled' />
                  <span>{workInfo.collectNum}</span>
                </div>
              </div>
              <div className='flex flex-col gap-10px font-italic font-size-m color-deepgrey'>
                <span>发布日期：{workInfo.createdDate}</span>
                <span>更新日期：{workInfo.updatedDate}</span>
              </div>
            </div>
          </div>
          {/* 用户信息 */}
          <div className='w-full my-10px flex flex-col gap-10px items-center'>
            <div className='w-150 flex justify-between'>
              <div className='flex gap-20px items-center'>
                <Link
                  to={`/personal-center/${workInfo.authorInfo.id}`}
                  className='w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-m color-shallowblack'>
                  <LazyImg src={workInfo.authorInfo.avatar} alt={workInfo.authorInfo.username} />
                </Link>
                <Link
                  className='color-shallowblack'
                  to={`/personal-center/${workInfo.authorInfo.id}`}>
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

            <div
              style={{
                margin: currentList === 'userWorkList' ? '10px 0 ' : '0',
                height: 0,
                padding: currentList === 'userWorkList' ? '59px 0 ' : '0',
              }}
              className='w-full relative transition-duration-300'>
              {currentList === 'userWorkList' && (
                <AnimatedDiv type='opacity-gradient' className='mt--59px'>
                  <LayoutList
                    workId={workId}
                    type='work-detail'
                    scrollType='work-detail'
                    setAtBottom={setAuthorWorkListEnd}
                    initializing={initializing}
                    setInitializing={setInitializing}>
                    {authorWorkList.map((everyPage) =>
                      everyPage.list.map((work) => (
                        <WorkItem
                          type='little'
                          animation='opacity-gradient'
                          key={work.id}
                          data-id={work.id}
                          itemInfo={work}
                          like={likeWork}
                          onClick={addUserWorks}
                        />
                      )),
                    )}
                    {!isFinal && <ImgLoadingSkeleton className='shrink-0 w-118px h-118px rd-1' />}
                  </LayoutList>
                </AnimatedDiv>
              )}
            </div>
          </div>
          {/* 原作信息 */}
          {workInfo.reprintType !== 0 && (
            <div className='bg-normal relative p-5 w-full rd-1'>
              {workInfo.reprintType === 1 && (
                <>
                  <div className='flex justify-between items-center'>
                    <span className='font-size-18px font-bold color-shallowblack'>原作品地址</span>
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
                  <span className='font-size-18px font-bold color-shallowblack'>原作者信息</span>
                  <span className='font-size-m color-deepgrey'>
                    目前收录 {workInfo.illustrator!.workCount} 个作品
                  </span>
                </div>
                {verifyPixivUser(workInfo.illustrator!.homeUrl) && (
                  <img className='w-15' src={pixiv} alt='pixiv' />
                )}
              </div>
              <div className='mt-10px flex items-center justify-between'>
                <div className='flex gap-20px items-center'>
                  <Link
                    to={`/illustrator/${workInfo.illustrator!.id}`}
                    target='_blank'
                    className='relative w-10 h-10 rd-full overflow-hidden cursor-pointer font-bold font-size-m color-shallowblack'>
                    <img
                      className='w-full h-full object-cover'
                      src={
                        workInfo.illustrator!.avatar ||
                        `https://fakeimg.pl/400x400?font=noto&text=${workInfo.illustrator!.name}`
                      }
                      alt={workInfo.illustrator!.name}
                    />
                  </Link>
                  <Link to={`/illustrator/${workInfo.illustrator!.id}`}>
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
        className='scrollbar-hidden '
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
