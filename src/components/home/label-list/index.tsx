import { FC } from 'react'
import type { LabelInfo } from '@/utils/types'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'
import Empty from '@/components/common/empty'
import LabelListSkeleton from '@/components/skeleton/label-list'
import { CSSTransition } from 'react-transition-group'

type LabelListProps = {
  loading: boolean
  labelList: LabelInfo[]
}

const LabelList: FC<LabelListProps> = ({ labelList, loading }) => {
  return (
    <div className='relative w-full min-h-10'>
      <CSSTransition
        in={labelList.length !== 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <LayoutList scrollType='label'>
          {labelList.map((item) => (
            <LabelItem key={item.id} {...item} />
          ))}
        </LayoutList>
      </CSSTransition>

      <CSSTransition
        in={labelList.length === 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty showImg={false} />
      </CSSTransition>

      <CSSTransition
        in={labelList.length === 0 && loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <LabelListSkeleton className='absolute top-0' />
      </CSSTransition>
    </div>
  )
}

export default LabelList
