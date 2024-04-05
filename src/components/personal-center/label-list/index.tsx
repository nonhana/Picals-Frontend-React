import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { LabelInfo } from '@/utils/types'
import { labelList } from '@/test/data'
import LabelItem from '@/components/common/label-item'

const LabelList: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [labels, setLabels] = useState<LabelInfo[]>()

  useEffect(() => {
    setLabels(labelList)
  }, [userId])

  return (
    <div className='relative w-100% flex gap-10px flex-wrap mb-5'>
      {labels?.map((label) => <LabelItem key={label.id} {...label} />)}
    </div>
  )
}

export default LabelList
