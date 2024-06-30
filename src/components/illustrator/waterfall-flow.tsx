import { FC, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getIllustratorWorksInPagesAPI } from '@/apis'
import type { WorkNormalItem } from '@/apis/types'
import WaterfallItem from '../common/waterfall-item'
import { useAtBottom } from '@/hooks'

const listClass = 'absolute w-80 flex flex-col gap-5'

type WaterfallItemInfo = WorkNormalItem & { index: number; height: number }

const WaterfallFlow: FC = () => {
  const { illustratorId } = useParams<{ illustratorId: string }>()

  const [workList, setWorkList] = useState<WaterfallItemInfo[]>([])
  const [_, setHeightArr] = useState<number[]>([0, 0, 0])
  const [current, setCurrent] = useState(1)
  const pageSize = 10
  const atBottom = useAtBottom()
  const containerRef = useRef<HTMLDivElement>(null)

  const getIllustratorWorksInPages = async () => {
    try {
      const { data } = await getIllustratorWorksInPagesAPI({
        id: illustratorId!,
        current,
        pageSize,
      })
      // 遍历作品数组，将每个作品插入到目前最短的列中
      data.forEach((item) => {
        const coverImage = new Image()
        coverImage.src = item.cover
        coverImage.onload = () => {
          setHeightArr((prev) => {
            const minIndex = prev.indexOf(Math.min(...prev))
            const newArr = [...prev]
            const resultHeight = Math.ceil((coverImage.height * 300) / coverImage.width)
            newArr[minIndex] += resultHeight + 20
            setWorkList((prev) => [
              ...prev,
              {
                ...item,
                index: minIndex,
                height: coverImage.height,
              },
            ])
            // 更新外层 div 高度
            if (containerRef.current) {
              containerRef.current.style.height = `${Math.max(...newArr)}px`
            }
            return newArr
          })
        }
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getIllustratorWorksInPages()
  }, [illustratorId, current])

  useEffect(() => {
    if (!atBottom) return
    setCurrent((prev) => prev + 1)
  }, [atBottom])

  return (
    <div ref={containerRef} className='relative w-250'>
      <div className={`${listClass}`}>
        {workList
          .filter((item) => item.index === 0)
          .map((item) => (
            <WaterfallItem key={item.id} item={item} />
          ))}
      </div>
      <div className={`${listClass} left-340px`}>
        {workList
          .filter((item) => item.index === 1)
          .map((item) => (
            <WaterfallItem key={item.id} item={item} />
          ))}
      </div>
      <div className={`${listClass} left-680px`}>
        {workList
          .filter((item) => item.index === 2)
          .map((item) => (
            <WaterfallItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  )
}

export default WaterfallFlow
