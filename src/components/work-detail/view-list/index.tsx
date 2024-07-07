import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { AppState } from '@/store/types'
import { VIEW_LIST_MAP, VIEW_LIST_ICON_MAP } from '@/utils'
import { getRecommendWorksAPI, getUserWorksIdListAPI, getWorkSimpleAPI } from '@/apis'
import {
  pushToRecommendWorkList,
  pushToUserWorkList,
  setCurrentIndex,
  setCurrentList,
} from '@/store/modules/viewList'
import { message, InputNumber } from 'antd'
import Pagination from '@/components/common/pagination'
import { Icon } from '@iconify/react'
import WorkSlideWindow from '../work-slide-window'
import { WorkNormalItemInfo } from '@/utils/types'

const viewListClasses =
  'w-full h-10 rd-1 transition-duration-300 hover:bg-#f5f5f5 cursor-pointer flex justify-between items-center px-5 color-#3d3d3d'

type ViewListProps = {
  workId: string
  authorWorkList: {
    page: number
    list: WorkNormalItemInfo[]
  }[]
  setAuthorWorkListEnd: (status: boolean) => void
  isFinal: boolean
  initializing: boolean
  setInitializing: (status: boolean) => void
}

// 从其他的页面点击作品进入到作品详情页，只需要设置：
// 1. 当前作品列表的类型
// 2. 这个作品列表的内容
const ViewList: FC<ViewListProps> = ({
  workId,
  authorWorkList,
  setAuthorWorkListEnd,
  isFinal: userWorkListFinal,
  initializing: userWorkListInitializing,
  setInitializing: setUserWorkListInitializing,
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()

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
  const [allowListName, setAllowListName] = useState<keyof typeof lists>()
  const [currentListLength, setCurrentListLength] = useState(0)
  const [prevWorkId, setPrevWorkId] = useState('')

  // 用来设置当前的作品列表长度
  useEffect(() => {
    if (currentList === 'userWorkList') {
      setCurrentListLength(userWorkList.length)
    } else {
      setCurrentListLength(lists[currentList as keyof typeof lists].length)
    }
  }, [currentList, userWorkList, lists])

  useEffect(() => {
    if (currentList !== 'userWorkList') {
      setAllowListName(currentList as keyof typeof lists)
    }
  }, [currentList])

  //#region 分页获取推荐作品列表
  const [recommendCurrent, setRecommendCurrent] = useState<number>()
  const recommendPageSize = 30
  const [recommendIsFinal, setRecommendIsFinal] = useState(false)
  const [recommendCurrentChanged, setRecommendCurrentChanged] = useState(0)
  const [loading, setLoading] = useState(false)
  const [recommendWorkList, setRecommendWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([])
  const [recommendListEnd, setRecommendListEnd] = useState(false)
  const [recommendInit, setRecommendInit] = useState(true)

  const initRecommendWorksList = async (initPage: number) => {
    setRecommendInit(true)
    try {
      for (let i = 1; i <= initPage; i++) {
        const targetList = lists.recommendWorkList.slice(
          (i - 1) * recommendPageSize,
          i * recommendPageSize,
        )
        const resultList = await Promise.all(
          targetList.map(async (id) => {
            const { data } = await getWorkSimpleAPI({ id })
            return data
          }),
        )
        setRecommendWorkList((prev) => [...prev, { page: i, list: resultList }])
      }
      setRecommendWorkList((prev) => [...prev, { page: initPage + 1, list: [] }])
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setRecommendInit(false)
    }
  }

  useEffect(() => {
    if (currentList === 'recommendWorkList') {
      const initPage = Math.ceil(lists.recommendWorkList.length / recommendPageSize)
      setRecommendCurrent(initPage)
      initRecommendWorksList(initPage)
    }
  }, [])

  const getRecommendWorksList = async () => {
    setLoading(true)
    try {
      const { data } = await getRecommendWorksAPI({
        current: recommendCurrent!,
        pageSize: recommendPageSize,
      })
      if (data.length < recommendPageSize) {
        setRecommendIsFinal(true)
      }
      setRecommendWorkList((prev) => {
        const result = prev.map((item) => {
          if (item.page === recommendCurrent) {
            return { page: item.page, list: data }
          }
          return item
        })
        result.push({ page: recommendCurrent! + 1, list: [] })
        return result
      })
      const result = data.map((work) => work.id)
      dispatch(pushToRecommendWorkList(result))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentList === 'recommendWorkList' && recommendCurrent) {
      setRecommendCurrentChanged((prev) => prev + 1)
    }
  }, [recommendCurrent])

  useEffect(() => {
    if (currentList === 'recommendWorkList') {
      if (loading) messageApi.loading('正在获取推荐作品列表...', 0)
      else messageApi.destroy()
    }
  }, [loading])

  useEffect(() => {
    if (currentList === 'recommendWorkList' && recommendCurrentChanged > 1) {
      getRecommendWorksList()
    }
  }, [recommendCurrentChanged])

  useEffect(() => {
    if (
      currentList === 'recommendWorkList' &&
      currentIndex === currentListLength &&
      !recommendIsFinal &&
      recommendCurrent
    ) {
      setRecommendCurrent((prev) => prev! + 1)
    }
  }, [currentIndex])

  useEffect(() => {
    if (currentList === 'recommendWorkList' && recommendListEnd && !recommendIsFinal) {
      setRecommendCurrent((prev) => prev! + 1)
    }
  }, [recommendListEnd])
  //#endregion

  //#region 分页获取当前浏览的作品列表信息（用户作品列表和推荐作品列表除外）
  const [current, setCurrent] = useState(1)
  const [isFinal, setIsFinal] = useState(false)
  const [listEnd, setListEnd] = useState(false)
  const [currentWorkList, setCurrentWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([{ page: current, list: [] }])
  const pageSize = 30
  const [initializing, setInitializing] = useState(true)

  const fetchCurrentWorkList = async () => {
    if (current === 1) setInitializing(true)
    try {
      const targetList = lists[currentList as keyof typeof lists].slice(
        (current - 1) * pageSize,
        current * pageSize,
      )
      const resultList = await Promise.all(
        targetList.map(async (id) => {
          const { data } = await getWorkSimpleAPI({ id })
          return data
        }),
      )
      setCurrentWorkList((prev) => {
        const result = prev.map((item) => {
          if (item.page === current) {
            return { page: item.page, list: resultList }
          }
          return item
        })
        result.push({ page: current + 1, list: [] })
        return result
      })
      if (targetList.length < pageSize) setIsFinal(true)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setInitializing(false)
    }
  }

  useEffect(() => {
    if (currentList !== 'recommendWorkList' && listEnd && !isFinal) setCurrent((prev) => prev + 1)
  }, [listEnd])

  useEffect(() => {
    if (currentList !== 'recommendWorkList' && currentList !== 'userWorkList')
      fetchCurrentWorkList()
  }, [current])
  //#endregion

  // 获取到目前正在浏览的作品id列表，并找到当前作品id对应的索引
  useEffect(() => {
    if (!workId) return
    if (currentList === 'userWorkList') {
      const index = userWorkList.findIndex((id) => id === workId)
      if (index !== -1) {
        dispatch(setCurrentIndex(index + 1))
      }
    } else {
      const targetList = lists[currentList as keyof typeof lists]
      const index = targetList.findIndex((id) => id === workId)
      if (index !== -1) {
        dispatch(setCurrentIndex(index + 1))
      }
    }
  }, [lists, currentList, workId, userWorkList])

  const changeList = (listName: string) => {
    if (currentList !== listName) {
      dispatch(setCurrentList(listName))
      if (listName === 'userWorkList') setPrevWorkId(workId)
      if (listName !== 'userWorkList' && prevWorkId !== '') {
        navigate(`/work-detail/${prevWorkId}`)
        setPrevWorkId('')
      }
      messageApi.success(`已切换到${VIEW_LIST_MAP[listName as keyof typeof VIEW_LIST_MAP]}列表`)
    }
  }
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
    if (workDetailUserId !== '' && userWorkList.length === 0) {
      getUserWorksIdList()
    }
  }, [workDetailUserId])

  // 在目前的作品列表中切换
  const changeIndex = (targetIndex: number) => {
    if (currentList === 'userWorkList') {
      navigate(`/work-detail/${userWorkList[targetIndex - 1]}`)
    } else {
      navigate(`/work-detail/${lists[currentList as keyof typeof lists][targetIndex - 1]}`)
    }
  }

  const [showIndexInput, setShowIndexInput] = useState(false)
  const [inputIndex, setInputIndex] = useState(0)

  useEffect(() => {
    if (showIndexInput) setInputIndex(currentIndex)
  }, [showIndexInput])

  // 监听键盘按下事件进行索引切换
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIndexInput) return
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        if (e.key === 'ArrowLeft' && currentIndex > 1) {
          changeIndex(currentIndex - 1)
        } else if (e.key === 'ArrowRight' && currentIndex < currentListLength) {
          changeIndex(currentIndex + 1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, currentListLength, showIndexInput])

  return (
    <>
      {contextHolder}
      <div className='relative flex flex-col gap-5 p-5 rd-6 bg-#fff w-82.5 select-none'>
        <div
          className={`${viewListClasses} ${currentList !== 'userWorkList' ? 'bg-#f5f5f5' : 'bg-white'}`}
          onClick={() => {
            if (allowListName) changeList(allowListName)
          }}>
          {allowListName ? (
            <>
              <span className='flex items-center gap-2.5'>
                <Icon
                  width={24}
                  icon={VIEW_LIST_ICON_MAP[allowListName as keyof typeof VIEW_LIST_ICON_MAP]}
                  color='#3d3d3d'
                />
                {VIEW_LIST_MAP[allowListName!]}
              </span>
              <span className='color-#858585 font-bold'>
                {currentList !== 'userWorkList' &&
                  (!showIndexInput ? (
                    <span onDoubleClick={() => setShowIndexInput(true)}>{currentIndex}/</span>
                  ) : (
                    <InputNumber
                      autoFocus
                      min={1}
                      max={currentListLength}
                      type='number'
                      size='small'
                      value={inputIndex}
                      onChange={(value) => setInputIndex(value || 0)}
                      onBlur={() => setShowIndexInput(false)}
                      onPressEnter={() => {
                        if (inputIndex > 0 && inputIndex <= userWorkList.length) {
                          changeIndex(inputIndex)
                          setShowIndexInput(false)
                        }
                      }}
                    />
                  ))}
                {lists[allowListName!].length}
              </span>
            </>
          ) : (
            <span className='flex items-center gap-2.5'>
              <Icon width={24} icon='material-symbols:hourglass-empty' color='#3d3d3d' />
              暂无列表
            </span>
          )}
        </div>
        {currentList !== 'userWorkList' && currentList !== 'recommendWorkList' && (
          <WorkSlideWindow
            workId={workId}
            workList={currentWorkList}
            isFinal={isFinal}
            setWorkListEnd={setListEnd}
            initializing={initializing}
            setInitializing={setInitializing}
          />
        )}
        {currentList === 'recommendWorkList' && (
          <WorkSlideWindow
            workId={workId}
            workList={recommendWorkList}
            isFinal={recommendIsFinal}
            setWorkListEnd={setRecommendListEnd}
            initializing={recommendInit}
            setInitializing={setRecommendInit}
          />
        )}
        <div
          className={`${viewListClasses} ${currentList === 'userWorkList' ? 'bg-#f5f5f5' : 'bg-white'}`}
          onClick={() => changeList('userWorkList')}>
          <span className='flex items-center gap-2.5'>
            <Icon width={24} icon={VIEW_LIST_ICON_MAP.userWorkList} color='#3d3d3d' />
            用户作品
          </span>
          <span className='color-#858585 font-bold'>
            {currentList === 'userWorkList' &&
              (!showIndexInput ? (
                <span onDoubleClick={() => setShowIndexInput(true)}>{currentIndex}/</span>
              ) : (
                <InputNumber
                  autoFocus
                  min={1}
                  max={currentListLength}
                  type='number'
                  size='small'
                  value={inputIndex}
                  onChange={(value) => setInputIndex(value || 0)}
                  onBlur={() => setShowIndexInput(false)}
                  onPressEnter={() => {
                    if (inputIndex > 0 && inputIndex <= userWorkList.length) {
                      changeIndex(inputIndex)
                      setShowIndexInput(false)
                    }
                  }}
                />
              ))}
            {userWorkList.length}
          </span>
        </div>
        {currentList === 'userWorkList' && (
          <WorkSlideWindow
            workId={workId}
            workList={authorWorkList}
            setWorkListEnd={setAuthorWorkListEnd}
            isFinal={userWorkListFinal}
            initializing={userWorkListInitializing}
            setInitializing={setUserWorkListInitializing}
          />
        )}
        <div className='w-full flex justify-center'>
          <Pagination
            total={currentListLength}
            pageSize={1}
            current={currentIndex}
            size='small'
            onChange={changeIndex}
          />
        </div>
      </div>
    </>
  )
}

export default ViewList
