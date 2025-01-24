import Empty from '@/components/common/empty'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'
import AnimatedDiv from '@/components/motion/animated-div'
import LabelListSkeleton from '@/components/skeleton/label-list'
import type { LabelInfo } from '@/utils/types'
import { FC } from 'react'

type LabelListProps = {
  loading: boolean
  labelList: LabelInfo[]
}

const LabelList: FC<LabelListProps> = ({ labelList, loading }) => {
  return (
    <div className='relative w-full min-h-10'>
      {labelList.length !== 0 && !loading && (
        <AnimatedDiv type='opacity-gradient'>
          <LayoutList scrollType='label'>
            {labelList.map((item) => (
              <LabelItem key={item.id} {...item} />
            ))}
          </LayoutList>
        </AnimatedDiv>
      )}

      {labelList.length === 0 && !loading && (
        <AnimatedDiv type='opacity-gradient'>
          <Empty showImg={false} />
        </AnimatedDiv>
      )}

      {labelList.length === 0 && loading && (
        <AnimatedDiv type='opacity-gradient' className='absolute top-0'>
          <LabelListSkeleton />
        </AnimatedDiv>
      )}
    </div>
  )
}

export default LabelList
