import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { LabelInfo } from '@/utils/types'
import LabelItem from '@/components/common/label-item'
import { getUserWorksLabelsAPI } from '@/apis'

const LabelList: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [labels, setLabels] = useState<LabelInfo[]>()

  const getLabels = async () => {
    try {
      const { data } = await getUserWorksLabelsAPI({ id: userId! })
      setLabels(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getLabels()
  }, [userId])

  return (
    <div className='relative w-100% flex gap-10px flex-wrap mb-5'>
      {labels?.map((label) => <LabelItem key={label.id} {...label} />)}
    </div>
  )
}

export default LabelList
