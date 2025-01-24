import { searchViewHistoryAPI } from '@/apis'
import type { HistoryItem } from '@/apis/types'
import AnimatedList from '@/components/common/animated-list'
import Empty from '@/components/common/empty'
import AnimatedDiv from '@/components/motion/animated-div'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { FC, useState, useEffect } from 'react'

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
      {Object.keys(resultMap).length > 0 && !gettingResult && (
        <AnimatedDiv type='opacity-gradient'>
          {Object.keys(resultMap).map((date) => (
            <div key={date} className='mb-5'>
              <div className='relative w-full flex gap-5 items-center pb-2.5 mb-5 b-b-solid b-2 b-deepgrey'>
                <Icon width='32px' color='#858585' icon='ant-design:clock-circle-twotone' />
                <span className='title color-deepgrey select-none'>{date}</span>
              </div>
              <AnimatedList type='history' workList={resultMap[date]} />
            </div>
          ))}
        </AnimatedDiv>
      )}

      {Object.keys(resultMap).length === 0 && !gettingResult && (
        <AnimatedDiv type='opacity-gradient'>
          <Empty />
        </AnimatedDiv>
      )}

      {Object.keys(resultMap).length === 0 && gettingResult && (
        <AnimatedDiv type='opacity-gradient'>
          <WorkListSkeleton className='absolute top-29' />
        </AnimatedDiv>
      )}
    </div>
  )
}

export default SearchResult
