import { FC, useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFavoriteList } from '@/store/modules/favorites'
import type { FavoriteDetailInfo, FavoriteItemInfo, WorkNormalItemInfo } from '@/utils/types'
import Sidebar from '@/components/personal-center/favorites/sidebar'
import Header from '@/components/personal-center/favorites/header'
import WorkList from '@/components/personal-center/favorites/work-list'
import {
  getFavoriteDetailAPI,
  getFavoriteWorkListAPI,
  searchFavoriteWorkAPI,
  getSearchResultNumAPI,
  likeActionsAPI,
  getUserFavoriteListAPI,
} from '@/apis'
import Empty from '@/components/common/empty'
import { PersonalContext } from '..'

const MyFavorites: FC = () => {
  const { isMe, userId } = useContext(PersonalContext)

  const dispatch = useDispatch()

  const searchParams = useSearchParams()[0]
  const folderId = searchParams.get('folderId')

  /* ----------收藏夹信息相关---------- */
  const [favoriteDetailInfo, setFavoriteDetailInfo] = useState<FavoriteDetailInfo>()

  // 获取收藏夹详细信息
  const getFavoriteDetail = async () => {
    try {
      const { data } = await getFavoriteDetailAPI({ id: folderId! })
      setFavoriteDetailInfo(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (folderId) getFavoriteDetail()
  }, [folderId])

  const [current, setCurrent] = useState(1)
  const [workList, setWorkList] = useState<WorkNormalItemInfo[]>([])

  const getFavoriteWorkList = async () => {
    try {
      const { data } = await getFavoriteWorkListAPI({ id: folderId!, current, pageSize: 12 })
      setWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (folderId) getFavoriteWorkList()
  }, [folderId, current])

  // 给收藏夹的作品点赞
  const like = async (id: string) => {
    try {
      await likeActionsAPI({ id })
      setWorkList(
        workList.map((item) => (item.id === id ? { ...item, isLiked: !item.isLiked } : item)),
      )
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  // 刷新作品列表
  const refresh = async () => {
    setCurrent(1)
    setSearchTotal(0)
    setSearchCurrent(1)
    setSearchStatus(false)
    await getFavoriteWorkList()
    await fetchFavoriteList()
    await getFavoriteDetail()
  }

  /* ----------收藏夹内部搜索相关---------- */
  const [searchTotal, setSearchTotal] = useState(0)
  const [searchCurrent, setSearchCurrent] = useState(1)
  const [searchStatus, setSearchStatus] = useState(false) // 是否处于搜索状态
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) setMounted(true)
    if (mounted && !searchStatus) {
      setSearchTotal(0)
      setCurrent(1)
      setSearchCurrent(1)
      getFavoriteWorkList()
    }
  }, [searchStatus])

  const handleSearch = async (keyword: string) => {
    try {
      setSearchCurrent(1)
      const { data: workNum } = await getSearchResultNumAPI({ keyword, favoriteId: folderId! })
      setSearchTotal(workNum)
      const { data: workList } = await searchFavoriteWorkAPI({
        id: folderId!,
        keyword,
        current: searchCurrent,
        pageSize: 12,
      })
      setWorkList(workList)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  /* ----------收藏夹列表相关---------- */
  const [folderList, setFolderList] = useState<FavoriteItemInfo[]>([])

  const fetchFavoriteList = async () => {
    try {
      const { data } = await getUserFavoriteListAPI({ id: userId! })
      data.sort((a, b) => a.order - b.order)
      if (isMe) dispatch(setFavoriteList(data))
      setFolderList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    fetchFavoriteList()
  }, [userId])

  return (
    <div className='flex mt-5 border-solid border-1px border-color-#6d757a'>
      <Sidebar
        folderList={folderList}
        setFolderList={setFolderList}
        fetchFavoriteList={fetchFavoriteList}
      />
      <div className='border-l-solid border-1px border-color-#6d757a'>
        {folderId ? (
          favoriteDetailInfo && (
            <>
              <Header {...favoriteDetailInfo} />
              <WorkList
                total={searchStatus ? searchTotal : favoriteDetailInfo.workNum}
                current={searchStatus ? searchCurrent : current}
                setCurrent={searchStatus ? setSearchCurrent : setCurrent}
                workList={workList}
                searchStatus={searchStatus}
                setSearchStatus={setSearchStatus}
                handleSearch={handleSearch}
                refresh={refresh}
                like={like}
              />
            </>
          )
        ) : (
          <div className='relative w-954px h-600px'>
            <Empty text='请选择一个收藏夹' />
          </div>
        )}
      </div>
    </div>
  )
}

export default MyFavorites
