import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { FavoriteDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import Sidebar from '@/components/personal-center/favorites/sidebar'
import Header from '@/components/personal-center/favorites/header'
import WorkList from '@/components/personal-center/favorites/work-list'
import {
  getFavoriteDetailAPI,
  getFavoriteWorkListAPI,
  searchFavoriteWorkAPI,
  getSearchResultNumAPI,
} from '@/apis'
import Empty from '@/components/common/empty'

const MyFavorites: FC = () => {
  const searchParams = useSearchParams()[0]
  const folderId = searchParams.get('folderId')

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

  const refresh = () => {
    setSearchTotal(0)
    setCurrent(1)
    setSearchCurrent(1)
    setSearchStatus(false)
    getFavoriteWorkList()
  }

  return (
    <div className='flex mt-5 border-solid border-1px border-color-#858585'>
      <Sidebar />
      <div className='border-l-solid border-1px border-color-#858585'>
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
