import LayoutList from '@/components/common/layout-list'
import WorkLeastItem from '@/components/common/work-least-item'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { WorkNormalItemInfo } from '@/utils/types'
import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

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
      {workList.map((everyPage, index) => (
        <CSSTransition
          key={`${everyPage.page}-${index}`}
          in={everyPage.list.length !== 0}
          timeout={300}
          classNames='opacity-gradient'
          unmountOnExit>
          <>
            {everyPage.list.map((work) => (
              <WorkLeastItem key={work.id} data-id={work.id} itemInfo={work} />
            ))}
          </>
        </CSSTransition>
      ))}
      {!isFinal && <ImgLoadingSkeleton className='shrink-0 w-90px h-90px rd-1' />}
    </LayoutList>
  )
}

export default WorkSlideWindow
