import LayoutList from '@/components/common/layout-list'
import WorkItem from '@/components/common/work-item'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { WorkNormalItemInfo } from '@/utils/types'
import { FC } from 'react'

type WorkSlideWindowProps = {
  workId: string
  workList: {
    page: number
    list: WorkNormalItemInfo[]
  }[]
  setWorkListEnd?: (status: boolean) => void
  isFinal?: boolean
  initializing?: boolean
  setInitializing?: (status: boolean) => void
  [key: string]: any
}

const WorkSlideWindow: FC<WorkSlideWindowProps> = ({
  workId,
  workList,
  setWorkListEnd,
  isFinal = true,
  initializing,
  setInitializing,
  ...props
}) => {
  return (
    <LayoutList
      {...props}
      workId={workId}
      type='work-detail'
      scrollType='work-little'
      setAtBottom={setWorkListEnd}
      initializing={initializing}
      setInitializing={setInitializing}>
      {workList.map((everyPage) =>
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
