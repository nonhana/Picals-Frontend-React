import LayoutList from '@/components/common/layout-list'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { WorkNormalItemInfo } from '@/utils/types'
import type { VirtualListProps } from '@/components/common/virtual-list'
import { useMemo } from 'react'

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
}

const WorkSlideWindow = ({
  workId,
  workList,
  setWorkListEnd,
  isFinal = true,
  initializing,
  setInitializing,
  ...rest
}: WorkSlideWindowProps) => {
  const virtualListItems = useMemo(
    () => workList.map((everyPage) => everyPage.list).flat(),
    [workList],
  )

  return (
    <LayoutList
      {...rest}
      virtualList
      data={virtualListItems}
      workId={workId}
      type='work-detail'
      scrollType='work-little'
      setAtBottom={setWorkListEnd}
      initializing={initializing}
      setInitializing={setInitializing}>
      {!isFinal && <ImgLoadingSkeleton className='shrink-0 w-90px h-90px rd-1' />}
    </LayoutList>
  )
}

export default WorkSlideWindow
