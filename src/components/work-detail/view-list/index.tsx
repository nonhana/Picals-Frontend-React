import { FC, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { AppState } from '@/store/types'
import { VIEW_LIST_MAP } from '@/utils'
import { getRecommendWorksAPI, getUserWorksIdListAPI } from '@/apis'
import {
  pushToRecommendWorkList,
  pushToUserWorkList,
  resetOtherList,
  setCurrentIndex,
  setCurrentList,
} from '@/store/modules/viewList'
import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react'

const viewListCLasses =
  'w-full h-10 rd-1 transition-duration-300 hover:bg-#f5f5f5 cursor-pointer flex justify-between items-center px-5 color-#3d3d3d'

// 从其他的页面点击作品进入到作品详情页，只需要设置：
// 1. 当前作品列表的类型
// 2. 这个作品列表的内容
const ViewList: FC = () => {
  const navigate = useNavigate()
  const { illustrationId } = useParams<{ illustrationId: string }>()

  const dispatch = useDispatch()
  const {
    workDetailUserId,
    fromUserId: _,
    fromFavoriteId: __,
    fromIllustratorId: ___,
    currentList,
    currentIndex,
    userWorkList,
    ...lists
  } = useSelector((state: AppState) => state.viewList)

  //#region 更改作品列表相关信息
  // 1. 其他的列表始终可以切换到当前作品的作者的作品列表，并默认可以来回切换。一旦更改作品url便不可再切换
  // 2. 若目前处于当前作品的作者的作品列表并且其他列表有内容，默认可以来回切换。一旦更改作品url便不可再切换
  const [illustrationIdChanged, setIllustrationIdChanged] = useState(0)
  const [allowListName, setAllowListName] = useState<keyof typeof lists>()
  const [currentListLength, setCurrentListLength] = useState(0)

  // 用来设置当前的作品列表长度
  useEffect(() => {
    console.log('currentList', currentList)
    if (currentList === 'userWorkList') {
      setCurrentListLength(userWorkList.length)
    } else {
      setCurrentListLength(lists[currentList as keyof typeof lists].length)
      console.log(lists)
    }
  }, [currentList, userWorkList, lists])

  // 记录每一次作品详情页的切换操作，第一次默认会+1
  useEffect(() => {
    setIllustrationIdChanged((prev) => prev + 1)
  }, [illustrationId])

  // 如果现在正在浏览用户的作品列表，且在这个列表上切换了作品，那么就重置其他的列表。因为这时候不再是从其他列表进入的
  useEffect(() => {
    if (illustrationIdChanged > 1 && currentList === 'userWorkList') {
      dispatch(resetOtherList())
      setAllowListName(undefined)
    }
  }, [illustrationIdChanged, currentList])

  // 每一次lists发生变化，都会检查是否有其他的列表有内容，如果有内容就可以切换到这个列表
  useEffect(() => {
    Object.keys(lists).forEach((key) => {
      const list = lists[key as keyof typeof lists]
      console.log(key, list)
      if (list.length !== 0) {
        setAllowListName(key as keyof typeof lists)
      }
    })
  }, [lists])

  // 获取到目前正在浏览的作品id列表，并找到当前作品id对应的索引
  useEffect(() => {
    if (currentList === 'userWorkList') {
      const index = userWorkList.findIndex((id) => id === illustrationId)
      if (index !== -1) {
        dispatch(setCurrentIndex(index))
      }
    } else {
      const index = lists[currentList as keyof typeof lists].findIndex(
        (id) => id === illustrationId,
      )
      if (index !== -1) {
        dispatch(setCurrentIndex(index))
      }
    }
  }, [lists, currentList, illustrationId, userWorkList])

  const changeList = (listName: string) => {
    if (currentList !== listName) {
      dispatch(setCurrentList(listName))
    }
  }
  //#endregion

  //#region 分页获取推荐作品列表
  const [recommendCurrent, setRecommendCurrent] = useState(1)
  const recommendPageSize = 30
  const [recommendIsFinal, setRecommendIsFinal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (currentList === 'recommendWorkList') {
      setRecommendCurrent(Math.ceil(lists.recommendWorkList.length / recommendPageSize))
    }
  }, [lists, currentList])

  const getRecommendWorksList = async () => {
    try {
      const { data } = await getRecommendWorksAPI({
        current: recommendCurrent,
        pageSize: recommendPageSize,
      })
      if (data.length < recommendPageSize) setRecommendIsFinal(true)
      const result = data.map((work) => work.id)
      dispatch(pushToRecommendWorkList(result))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }
    if (currentList === 'recommendWorkList') {
      getRecommendWorksList()
    }
  }, [recommendCurrent, mounted])

  useEffect(() => {
    if (
      currentList === 'recommendWorkList' &&
      currentIndex === currentListLength - 1 &&
      !recommendIsFinal
    ) {
      setRecommendCurrent((prev) => prev + 1)
    }
  }, [currentIndex])
  //#endregion

  // 获取到当前作品的作者的作品id列表
  const getUserWorksIdList = async () => {
    try {
      const { data } = await getUserWorksIdListAPI({ id: workDetailUserId })
      dispatch(pushToUserWorkList(data))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (workDetailUserId !== '') {
      getUserWorksIdList()
    }
  }, [workDetailUserId])

  // 在目前的作品列表中切换
  const changeIndex = (type: 'forward' | 'backward') => {
    if (type === 'forward') {
      if (currentIndex < currentListLength - 1) {
        if (currentList === 'userWorkList') {
          navigate(`/work-detail/${userWorkList[currentIndex + 1]}`)
        } else {
          navigate(`/work-detail/${lists[currentList as keyof typeof lists][currentIndex + 1]}`)
        }
      }
    } else {
      if (currentIndex > 0) {
        if (currentList === 'userWorkList') {
          navigate(`/work-detail/${userWorkList[currentIndex - 1]}`)
        } else {
          navigate(`/work-detail/${lists[currentList as keyof typeof lists][currentIndex - 1]}`)
        }
      }
    }
  }

  return (
    <div className='relative flex flex-col gap-5 p-5 rd-6 bg-#fff w-82.5'>
      <div
        className={`${viewListCLasses} ${currentList !== 'userWorkList' ? 'bg-#f5f5f5' : 'bg-white'}`}
        onClick={() => {
          if (allowListName) changeList(allowListName)
        }}>
        {allowListName ? (
          <>
            <span>{VIEW_LIST_MAP[allowListName]}</span>
            <span>作品数：{lists[allowListName].length}</span>
          </>
        ) : (
          <span>暂无其他可切换的作品列表</span>
        )}
      </div>
      <div
        className={`${viewListCLasses} ${currentList === 'userWorkList' ? 'bg-#f5f5f5' : 'bg-white'}`}
        onClick={() => changeList('userWorkList')}>
        <span>该用户的作品列表</span>
        <span>作品数：{userWorkList.length}</span>
      </div>
      <div className='w-full flex justify-between'>
        <GreyButton disabled={currentIndex === 0} onClick={() => changeIndex('backward')}>
          <Icon color='#fff' icon='ant-design:caret-left-filled' />
        </GreyButton>
        <span>现浏览作品索引：{currentIndex}</span>
        <GreyButton
          disabled={currentIndex === currentListLength - 1}
          onClick={() => changeIndex('forward')}>
          <Icon color='#fff' icon='ant-design:caret-right-filled' />
        </GreyButton>
      </div>
    </div>
  )
}

export default ViewList
