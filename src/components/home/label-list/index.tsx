import { FC } from 'react'
import type { LabelInfo } from '@/utils/types'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'

type LabelListProps = {
  labelList: LabelInfo[]
}

const LabelList: FC<LabelListProps> = ({ labelList }) => {
  return (
    <LayoutList scrollType='label'>
      {labelList.map((item) => (
        <LabelItem key={item.id} {...item} />
      ))}
    </LayoutList>
  )
}

export default LabelList
