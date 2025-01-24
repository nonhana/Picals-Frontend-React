import LayoutList from '@/components/common/layout-list'
import WorkItem from '@/components/common/work-item'
import AnimatedDiv from '@/components/motion/animated-div'
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
      {workList.map(
        (everyPage, index) =>
          everyPage.list.length !== 0 && (
            <AnimatedDiv key={`${everyPage.page}-${index}`} type='opacity-gradient'>
              {everyPage.list.map((work) => (
                <WorkItem type='least' key={work.id} data-id={work.id} itemInfo={work} />
              ))}
            </AnimatedDiv>
          ),
      )}
      {!isFinal && <ImgLoadingSkeleton className='shrink-0 w-90px h-90px rd-1' />}
    </LayoutList>
  )
}

export default WorkSlideWindow
