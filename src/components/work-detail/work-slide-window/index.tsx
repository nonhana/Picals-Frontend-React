import LayoutList from '@/components/common/layout-list'
import WorkItem from '@/components/common/work-item'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { WorkNormalItemInfo } from '@/utils/types'
import type { VirtualListProps } from '@/components/common/virtual-list'
import { useEffect, useMemo } from 'react'

interface WorkSlideWindowProps extends Partial<VirtualListProps> {
  workId: string
  workList: {
    page: number
    list: WorkNormalItemInfo[]
  }[]
  setWorkListEnd?: (status: boolean) => void
  isFinal?: boolean
  initializing?: boolean
  setInitializing?: (status: boolean) => void
  virtualList?: boolean // 是否使用虚拟列表。若使用，需要传入 VirtualListProps
}

const WorkSlideWindow = ({
  workId,
  workList,
  setWorkListEnd,
  isFinal = true,
  initializing,
  setInitializing,
  virtualList,
  ...rest
}: WorkSlideWindowProps) => {
  const virtualListItems = useMemo(
    () => workList.map((everyPage) => everyPage.list).flat(),
    [workList],
  )

  useEffect(() => {
    console.log('virtualListItems:', virtualListItems)
  }, [virtualListItems])

  return (
    <LayoutList
      {...rest}
      virtualList={virtualList}
      data={virtualListItems}
      workId={workId}
      type='work-detail'
      scrollType='work-little'
      setAtBottom={setWorkListEnd}
      initializing={initializing}
      setInitializing={setInitializing}>
      {!virtualList &&
        workList.map((everyPage) =>
          everyPage.list.map((work) => (
            <WorkItem
              type='least'
              animation='opacity-gradient'
              key={work.id}
              data-id={work.id}
              itemInfo={work}
            />
          )),
        )}
      {!isFinal && <ImgLoadingSkeleton className='shrink-0 w-90px h-90px rd-1' />}
    </LayoutList>
  )
}

export default WorkSlideWindow
