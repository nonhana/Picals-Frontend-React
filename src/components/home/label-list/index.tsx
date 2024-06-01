import { FC } from 'react'
import type { LabelInfo } from '@/utils/types'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'
import Empty from '@/components/common/empty'

type LabelListProps = {
  loading: boolean
  labelList: LabelInfo[]
}

const LabelList: FC<LabelListProps> = ({ labelList, loading }) => {
  return (
    <>
      <LayoutList scrollType='label'>
        {labelList.map((item) => (
          <LabelItem key={item.id} {...item} />
        ))}
      </LayoutList>

      {labelList.length === 0 && !loading && <Empty showImg={false} />}
    </>
  )
}

export default LabelList
