import { FC, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import LabelList from '@/components/home/label-list/index'
import FollowedWorks from '@/components/home/followed-works'
import RecommendedWorks from '@/components/home/recommended-works'
// import RankingList from '@/components/home/ranking-list'
import { getRecommendLabelListAPI, getFollowNewWorksAPI, getRecommendWorksAPI } from '@/apis'
import { LabelInfo, WorkNormalItemInfo } from '@/utils/types'

const Home: FC = () => {
  const { isLogin } = useSelector((state: AppState) => state.user)

  const [width, setWidth] = useState<number>(1245)
  const homeRef = useRef<HTMLDivElement>(null)
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  /* ----------获取数据相关---------- */
  const [loading, setLoading] = useState<boolean>(false)

  // 标签列表相关
  const [labelList, setLabelList] = useState<LabelInfo[]>([])
  const getLabelList = async () => {
    try {
      setLoading(true)
      const { data } = await getRecommendLabelListAPI()
      setLabelList(data)
    } catch (error) {
      console.log('获取标签列表失败', error)
    } finally {
      setLoading(false)
    }
  }

  // 最新关注作品相关
  const [followWorkList, setFollowWorkList] = useState<WorkNormalItemInfo[]>([])
  const getFollowNewWorks = async () => {
    try {
      setLoading(true)
      const { data } = await getFollowNewWorksAPI({ pageSize: 30, current: 1 })
      setFollowWorkList(data)
    } catch (error) {
      console.log('获取最新关注作品失败', error)
    } finally {
      setLoading(false)
    }
  }

  // 获取推荐作品相关
  const [recommendWorkList, setRecommendWorkList] = useState<WorkNormalItemInfo[]>([])
  const getRecommendWorks = async () => {
    try {
      setLoading(true)
      const { data } = await getRecommendWorksAPI({ pageSize: 30, current: 1 })
      setRecommendWorkList(data)
    } catch (error) {
      console.log('获取推荐作品失败', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLabelList()
    if (isLogin) getFollowNewWorks()
    getRecommendWorks()
  }, [])

  return (
    <div ref={homeRef} className='relative w-100% my-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col mx-auto'>
        <LabelList loading={loading} labelList={labelList} />
        {isLogin && <FollowedWorks loading={loading} workList={followWorkList} />}
        <RecommendedWorks loading={loading} workList={recommendWorkList} />
        {/* TODO: 暂时没写好排行榜接口 */}
        {/* <RankingList loading={loading} workList={rankWorkList} /> */}
      </div>
    </div>
  )
}

export default Home
