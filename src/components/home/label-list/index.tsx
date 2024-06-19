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
    <>
      <CSSTransition
        in={labelList.length !== 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-wrap gap-20px'>
          <LayoutList scrollType='label'>
            {labelList.map((item) => (
              <LabelItem key={item.id} {...item} />
            ))}
          </LayoutList>
        </div>
      </CSSTransition>

      {labelList.length === 0 &&
        (loading ? (
          <div className='relative w-full'>
            <LabelListSkeleton />
          </div>
        ) : (
          <Empty showImg={false} />
        ))}
    </>
  )
}

export default LabelList
