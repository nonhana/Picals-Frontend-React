import {
  getRecommendWorksAPI,
  getLatestWorksAPI,
  getUserWorksIdListAPI,
  getWorkSimpleAPI,
} from '@/apis'
import { Pagination } from '@/apis/types'
import PaginationComponent from '@/components/common/pagination'
import { setTempId } from '@/store/modules/user'
import {
  pushToLatestWorkList,
  pushToRecommendWorkList,
  pushToUserWorkList,
  setCurrentIndex,
  setCurrentList,
  setPrevWorkId,
} from '@/store/modules/viewList'
import type { AppState } from '@/store/types'
import { VIEW_LIST_MAP, VIEW_LIST_ICON_MAP, generateTempId } from '@/utils'
import { WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { message, InputNumber, Button } from 'antd'
import { FC, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import WorkSlideWindow from '../work-slide-window'

const viewListClasses =
  'my-5 w-full h-10 rd-1 transition-duration-300 hover:bg-#f5f5f5 cursor-pointer flex justify-between items-center px-5 color-#3d3d3d'

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
    prevPosition,
    prevWorkId,
    workDetailUserId,
    currentList,
    currentIndex,
    userWorkList,
    ...lists
  } = useSelector((state: AppState) => state.viewList)
  const { tempId, isLogin } = useSelector((state: AppState) => state.user)

  //#region 更改作品列表相关信息
  const [allowListName, setAllowListName] = useState<keyof typeof lists>()
  const [currentListLength, setCurrentListLength] = useState(0)

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
    } else {
      Object.keys(lists).forEach((key) => {
        if (lists[key as keyof typeof lists].length > 0) {
          setAllowListName(key as keyof typeof lists)
        }
      })
    }
  }, [currentList, lists])

  //#region 分页获取推荐作品列表
  const recommendMounted = useRef(false)
  const [recommendCurrent, setRecommendCurrent] = useState<number>()
  const recommendPageSize = 30
  const [recommendIsFinal, setRecommendIsFinal] = useState(false)
  const [recommendCurrentChanged, setRecommendCurrentChanged] = useState(0)
  const [recommendLoading, setRecommendLoading] = useState(false)
  const [recommendWorkList, setRecommendWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([])
  const [recommendListEnd, setRecommendListEnd] = useState(false)
  const [recommendInit, setRecommendInit] = useState(true)

  const initRecommendWorksList = useCallback(
    async (initPage: number) => {
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
    },
    [lists.recommendWorkList],
  )

  useEffect(() => {
    if (recommendMounted.current) return
    if (allowListName === 'recommendWorkList') {
      const initPage = Math.ceil(lists.recommendWorkList.length / recommendPageSize)
      console.log('是在位置3触发的')
      setRecommendCurrent(initPage)
      initRecommendWorksList(initPage)
      recommendMounted.current = true
    }
  }, [allowListName, initRecommendWorksList, lists.recommendWorkList.length])

  const getRecommendWorksList = useCallback(async () => {
    console.log('推荐函数发生变化', recommendCurrent, recommendIsFinal, tempId, isLogin, dispatch)
    setRecommendLoading(true)
    try {
      const params: Pagination = {
        current: recommendCurrent!,
        pageSize: recommendPageSize,
      }
      if (!isLogin) {
        if (!tempId) dispatch(setTempId(generateTempId()))
        params.id = tempId
      }
      const { data } = await getRecommendWorksAPI(params)
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
        if (!recommendIsFinal) result.push({ page: recommendCurrent! + 1, list: [] })
        return result
      })
      const result = data.map((work) => work.id)
      dispatch(pushToRecommendWorkList(result))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setRecommendLoading(false)
    }
  }, [recommendCurrent, recommendIsFinal, tempId, isLogin, dispatch])

  useEffect(() => {
    if (allowListName === 'recommendWorkList' && recommendCurrent) {
      console.log(allowListName, recommendCurrent)
      setRecommendCurrentChanged((prev) => prev + 1)
    }
  }, [recommendCurrent, allowListName])

  useEffect(() => {
    if (allowListName === 'recommendWorkList') {
      if (recommendLoading) messageApi.loading('正在获取推荐作品列表...', 0)
      else messageApi.destroy()
    }
  }, [recommendLoading, allowListName, messageApi])

  useEffect(() => {
    if (allowListName === 'recommendWorkList' && recommendCurrentChanged > 1) {
      console.log('是在 getRecommendWorksList 外部触发的', allowListName, recommendCurrentChanged)
      getRecommendWorksList()
    }
  }, [recommendCurrentChanged, allowListName, getRecommendWorksList])

  useEffect(() => {
    if (
      allowListName === 'recommendWorkList' &&
      currentIndex >= currentListLength &&
      !recommendIsFinal
    ) {
      console.log('是在位置1触发的')
      setRecommendCurrent((prev) => prev! + 1)
    }
  }, [currentIndex, allowListName, currentListLength, recommendIsFinal])

  useEffect(() => {
    if (allowListName === 'recommendWorkList' && recommendListEnd && !recommendIsFinal) {
      console.log('是在位置2触发的')
      setRecommendCurrent((prev) => prev! + 1)
    }
  }, [recommendListEnd, allowListName, recommendIsFinal])
  //#endregion

  //#region 分页获取最新作品列表
  const [latestCurrent, setLatestCurrent] = useState<number>()
  const latestPageSize = 30
  const [latestIsFinal, setLatestIsFinal] = useState(false)
  const [latestCurrentChanged, setLatestCurrentChanged] = useState(0)
  const [latestLoading, setLatestLoading] = useState(false)
  const [latestWorkList, setLatestWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([])
  const [latestListEnd, setLatestListEnd] = useState(false)
  const [latestInit, setLatestInit] = useState(true)

  const initLatestWorksList = useCallback(
    async (initPage: number) => {
      setLatestInit(true)
      try {
        for (let i = 1; i <= initPage; i++) {
          const targetList = lists.latestWorkList.slice(
            (i - 1) * latestPageSize,
            i * latestPageSize,
          )
          const resultList = await Promise.all(
            targetList.map(async (id) => {
              const { data } = await getWorkSimpleAPI({ id })
              return data
            }),
          )
          setLatestWorkList((prev) => [...prev, { page: i, list: resultList }])
        }
        setLatestWorkList((prev) => [...prev, { page: initPage + 1, list: [] }])
      } catch (error) {
        console.log('出现错误了喵！！', error)
        return
      } finally {
        setLatestInit(false)
      }
    },
    [lists.latestWorkList],
  )

  useEffect(() => {
    if (allowListName === 'latestWorkList') {
      const initPage = Math.ceil(lists.latestWorkList.length / latestPageSize)
      setLatestCurrent(initPage)
      initLatestWorksList(initPage)
    }
  }, [allowListName, initLatestWorksList, lists.latestWorkList.length])

  const getLatestWorksList = useCallback(async () => {
    setLatestLoading(true)
    try {
      const { data } = await getLatestWorksAPI({
        current: latestCurrent!,
        pageSize: latestPageSize,
      })
      if (data.length < latestPageSize) {
        setLatestIsFinal(true)
      }
      setLatestWorkList((prev) => {
        const result = prev.map((item) => {
          if (item.page === latestCurrent) {
            return { page: item.page, list: data }
          }
          return item
        })
        if (!latestIsFinal) result.push({ page: latestCurrent! + 1, list: [] })
        return result
      })
      const result = data.map((work) => work.id)
      dispatch(pushToLatestWorkList(result))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLatestLoading(false)
    }
  }, [dispatch, latestCurrent, latestIsFinal])

  useEffect(() => {
    if (allowListName === 'latestWorkList' && latestCurrent) {
      setLatestCurrentChanged((prev) => prev + 1)
    }
  }, [latestCurrent, allowListName])

  useEffect(() => {
    if (allowListName === 'latestWorkList') {
      if (latestLoading) messageApi.loading('正在获取最新作品列表...', 0)
      else messageApi.destroy()
    }
  }, [latestLoading, allowListName, messageApi])

  useEffect(() => {
    if (allowListName === 'latestWorkList' && latestCurrentChanged > 1) {
      getLatestWorksList()
    }
  }, [latestCurrentChanged, allowListName, getLatestWorksList])

  useEffect(() => {
    if (
      allowListName === 'latestWorkList' &&
      currentIndex >= currentListLength &&
      !latestIsFinal &&
      latestCurrent
    ) {
      setLatestCurrent((prev) => prev! + 1)
    }
  }, [currentIndex, allowListName, currentListLength, latestIsFinal, latestCurrent])

  useEffect(() => {
    if (allowListName === 'latestWorkList' && latestListEnd && !latestIsFinal) {
      setLatestCurrent((prev) => prev! + 1)
    }
  }, [latestListEnd, allowListName, latestIsFinal])
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

  const fetchCurrentWorkList = useCallback(async () => {
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
        if (!isFinal) result.push({ page: current + 1, list: [] })
        return result
      })
      if (targetList.length < pageSize) setIsFinal(true)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setInitializing(false)
    }
  }, [current, currentList, isFinal, lists])

  useEffect(() => {
    if (allowListName && allowListName !== 'recommendWorkList' && listEnd && !isFinal)
      setCurrent((prev) => prev + 1)
  }, [listEnd, allowListName, isFinal])

  useEffect(() => {
    if (allowListName && allowListName !== 'recommendWorkList') fetchCurrentWorkList()
  }, [current, allowListName, fetchCurrentWorkList])
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
  }, [lists, currentList, workId, userWorkList, dispatch])

  const changeList = (listName: string) => {
    if (currentList !== listName) {
      dispatch(setCurrentList(listName))
      if (listName === 'userWorkList') dispatch(setPrevWorkId(workId))
      if (listName !== 'userWorkList' && prevWorkId !== '') {
        navigate(`/work-detail/${prevWorkId}`)
        dispatch(setPrevWorkId(workId))
      }
      messageApi.success(`已切换到${VIEW_LIST_MAP[listName as keyof typeof VIEW_LIST_MAP]}列表`)
    }
  }

  // 获取到当前作品的作者的作品id列表
  const getUserWorksIdList = useCallback(async () => {
    try {
      const { data } = await getUserWorksIdListAPI({ id: workDetailUserId })
      dispatch(pushToUserWorkList(data))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }, [dispatch, workDetailUserId])

  useEffect(() => {
    if (workDetailUserId !== '' && userWorkList.length === 0) {
      getUserWorksIdList()
    }
  }, [getUserWorksIdList, userWorkList.length, workDetailUserId])

  // 在目前的作品列表中切换
  const changeIndex = useCallback(
    (targetIndex: number) => {
      if (currentList === 'userWorkList') {
        navigate(`/work-detail/${userWorkList[targetIndex - 1]}`)
      } else {
        navigate(`/work-detail/${lists[currentList as keyof typeof lists][targetIndex - 1]}`)
      }
    },
    [currentList, lists, userWorkList, navigate],
  )

  const [showIndexInput, setShowIndexInput] = useState(false)
  const [inputIndex, setInputIndex] = useState(0)

  useEffect(() => {
    if (showIndexInput) setInputIndex(currentIndex)
  }, [currentIndex, showIndexInput])

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
  }, [changeIndex, currentIndex, currentListLength, showIndexInput])

  // WorkSlideWindow 展示状态数组
  const [showSlideWindows, setShowSlideWindows] = useState<[boolean, boolean, boolean, boolean]>([
    false,
    false,
    false,
    false,
  ])
  useEffect(() => {
    setShowSlideWindows([
      currentList !== 'userWorkList' &&
        currentList !== 'recommendWorkList' &&
        currentList !== 'latestWorkList',
      currentList === 'recommendWorkList',
      currentList === 'latestWorkList',
      currentList === 'userWorkList',
    ])
  }, [currentList])

  return (
    <>
      {contextHolder}
      <div className='relative flex flex-col p-5 rd-6 bg-#fff w-82.5 select-none'>
        <div
          className={`mt-0 ${viewListClasses} ${currentList !== 'userWorkList' ? 'bg-#f5f5f5' : 'bg-white'}`}
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
        <div
          style={{
            display:
              allowListName === 'recommendWorkList' || allowListName === 'latestWorkList'
                ? 'none'
                : 'block',
            margin: showSlideWindows[0] ? '0 ' : '-10px 0',
            height: 0,
            padding: showSlideWindows[0] ? '45px 0 ' : '0',
          }}
          className='w-full relative transition-duration-300'>
          <CSSTransition
            in={showSlideWindows[0]}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <WorkSlideWindow
              className='mt--45px'
              workId={workId}
              workList={currentWorkList}
              isFinal={isFinal}
              setWorkListEnd={setListEnd}
              initializing={initializing}
              setInitializing={setInitializing}
            />
          </CSSTransition>
        </div>
        <div
          style={{
            display: allowListName !== 'recommendWorkList' ? 'none' : 'block',
            margin: showSlideWindows[1] ? '0 ' : '-10px 0',
            height: 0,
            padding: showSlideWindows[1] ? '45px 0 ' : '0',
          }}
          className='w-full relative transition-duration-300'>
          <CSSTransition
            in={showSlideWindows[1]}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <WorkSlideWindow
              className='mt--45px'
              workId={workId}
              workList={recommendWorkList}
              isFinal={recommendIsFinal}
              setWorkListEnd={setRecommendListEnd}
              initializing={recommendInit}
              setInitializing={setRecommendInit}
            />
          </CSSTransition>
        </div>
        <div
          style={{
            display: allowListName !== 'latestWorkList' ? 'none' : 'block',
            margin: showSlideWindows[2] ? '0 ' : '-10px 0',
            height: 0,
            padding: showSlideWindows[2] ? '45px 0 ' : '0',
          }}
          className='w-full relative transition-duration-300'>
          <CSSTransition
            in={showSlideWindows[2]}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <WorkSlideWindow
              className='mt--45px'
              workId={workId}
              workList={latestWorkList}
              isFinal={latestIsFinal}
              setWorkListEnd={setLatestListEnd}
              initializing={latestInit}
              setInitializing={setLatestInit}
            />
          </CSSTransition>
        </div>
        <div
          className={`${viewListClasses} ${showSlideWindows[3] ? 'bg-#f5f5f5' : 'bg-white'}`}
          onClick={() => changeList('userWorkList')}>
          <span className='flex items-center gap-2.5'>
            <Icon width={24} icon={VIEW_LIST_ICON_MAP.userWorkList} color='#3d3d3d' />
            用户作品
          </span>
          <span className='color-#858585 font-bold'>
            {showSlideWindows[3] &&
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
        <div
          style={{
            margin: showSlideWindows[3] ? '0 ' : '-10px 0',
            height: 0,
            padding: showSlideWindows[3] ? '45px 0 ' : '0',
          }}
          className='w-full relative transition-duration-300'>
          <CSSTransition
            in={showSlideWindows[3]}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <WorkSlideWindow
              className='mt--45px'
              workId={workId}
              workList={authorWorkList}
              setWorkListEnd={setAuthorWorkListEnd}
              isFinal={userWorkListFinal}
              initializing={userWorkListInitializing}
              setInitializing={setUserWorkListInitializing}
            />
          </CSSTransition>
        </div>
        <div className='w-full my-10px flex justify-center'>
          <PaginationComponent
            total={currentListLength}
            pageSize={1}
            current={currentIndex}
            size='small'
            onChange={changeIndex}
          />
        </div>
        <Link className='w-full' to={prevPosition === '' ? '/home' : prevPosition}>
          <Button className='w-full' type='primary' shape='round' size='large'>
            回到上一个页面
          </Button>
        </Link>
      </div>
    </>
  )
}

export default ViewList
