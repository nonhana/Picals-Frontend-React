import { searchViewHistoryAPI } from '@/apis'
import type { HistoryItem } from '@/apis/types'
import AnimeList from '@/components/common/anime-list'
import Empty from '@/components/common/empty'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { FC, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

type SearchResultProps = {
  keyword: string
  searchTrigger: number
}

const SearchResult: FC<SearchResultProps> = ({ keyword, searchTrigger }) => {
  const [resultList, setResultList] = useState<HistoryItem[]>([])
  const [resultMap, setResultMap] = useState<Record<string, HistoryItem[]>>({})
  const [gettingResult, setGettingResult] = useState<boolean>(true)

  const searchHistory = async () => {
    setGettingResult(true)
    try {
      const { data } = await searchViewHistoryAPI({ keyword })
      setResultList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingResult(false)
    }
  }

  useEffect(() => {
    searchHistory()
  }, [searchTrigger])

  useEffect(() => {
    const map: Record<string, HistoryItem[]> = {}
    resultList.forEach((item) => {
      const date = dayjs(item.lastTime).format('YYYY-MM-DD')
      if (!map[date]) {
        map[date] = []
      }
      map[date].push(item)
    })
    setResultMap(map)
  }, [resultList])

  return (
    <div className='relative w-full min-h-160'>
      <CSSTransition
        in={Object.keys(resultMap).length > 0 && !gettingResult}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <>
          {Object.keys(resultMap).map((date) => (
            <div key={date} className='mb-5'>
              <div className='relative w-full flex gap-5 items-center pb-2.5 mb-5 b-b-solid b-2 b-deepgrey'>
                <Icon width='32px' color='#858585' icon='ant-design:clock-circle-twotone' />
                <span className='title color-deepgrey select-none'>{date}</span>
              </div>
              <AnimeList type='history' workList={resultMap[date]} />
            </div>
          ))}
        </>
      </CSSTransition>

      <CSSTransition
        in={Object.keys(resultMap).length === 0 && !gettingResult}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty />
      </CSSTransition>

      <CSSTransition
        in={Object.keys(resultMap).length === 0 && gettingResult}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <WorkListSkeleton className='absolute top-29' />
      </CSSTransition>
    </div>
  )
}

export default SearchResult
