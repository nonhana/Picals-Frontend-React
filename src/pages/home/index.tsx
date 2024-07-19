import { FC, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { AppState } from '@/store/types'
import LabelList from '@/components/home/label-list/index'
import FollowedWorks from '@/components/home/followed-works'
import RecommendedWorks from '@/components/home/recommended-works'
// import RankingList from '@/components/home/ranking-list'
import { getRecommendLabelListAPI, getFollowNewWorksAPI, getRecommendWorksAPI } from '@/apis'
import { LabelInfo, WorkNormalItemInfo } from '@/utils/types'
import { generateTempId } from '@/utils'
import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react'
import { Pagination } from '@/apis/types'
import { setTempId } from '@/store/modules/user'

const Home: FC = () => {
  const dispatch = useDispatch()
  const { isLogin, tempId } = useSelector((state: AppState) => state.user)

  const [width, setWidth] = useState<number>(1245)
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  /* ----------获取数据相关---------- */

  // 标签列表相关
  const [labelList, setLabelList] = useState<LabelInfo[]>([])
  const [gettingLabelList, setGettingLabelList] = useState(true)

  const getLabelList = async () => {
    setGettingLabelList(true)
    try {
      const { data } = await getRecommendLabelListAPI()
      setLabelList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingLabelList(false)
    }
  }

  // 最新关注作品相关
  const [followWorkList, setFollowWorkList] = useState<WorkNormalItemInfo[]>([])
  const [gettingFollowWorkList, setGettingFollowWorkList] = useState(true)

  const getFollowNewWorks = async () => {
    setGettingFollowWorkList(true)
    try {
      const { data } = await getFollowNewWorksAPI({ pageSize: 30, current: 1 })
      setFollowWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingFollowWorkList(false)
    }
  }

  // 获取推荐作品相关
  const [recommendWorkList, setRecommendWorkList] = useState<WorkNormalItemInfo[]>([])
  const [gettingRecommendWorkList, setGettingRecommendWorkList] = useState(true)

  const getRecommendWorks = async () => {
    setGettingRecommendWorkList(true)
    setRecommendWorkList([])
    try {
      const params: Pagination = { pageSize: 30, current: 1 }
      if (!isLogin) {
        if (!tempId) dispatch(setTempId(generateTempId()))
        params.id = tempId
      }
      const { data } = await getRecommendWorksAPI(params) // 只获取一页
      setRecommendWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingRecommendWorkList(false)
    }
  }

  useEffect(() => {
    getLabelList()
    if (isLogin) getFollowNewWorks()
    getRecommendWorks()
  }, [])

  return (
    <div className='relative w-full my-30px select-none'>
      <div style={{ width: `${width}px` }} className='flex flex-col mx-auto'>
        <LabelList loading={gettingLabelList} labelList={labelList} />
        {isLogin && <FollowedWorks loading={gettingFollowWorkList} workList={followWorkList} />}
        <RecommendedWorks loading={gettingRecommendWorkList} workList={recommendWorkList} />
        {/* TODO: 暂时没写好排行榜接口 */}
        {/* <RankingList loading={loading} workList={rankWorkList} /> */}
      </div>

      <div className='fixed bottom-10 right-10'>
        <GreyButton onClick={getRecommendWorks}>
          <Icon color='#fff' icon='ant-design:reload-outlined' />
        </GreyButton>
      </div>
    </div>
  )
}

export default Home
