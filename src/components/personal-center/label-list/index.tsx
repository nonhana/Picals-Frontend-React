import { getUserWorksLabelsAPI } from '@/apis'
import Empty from '@/components/common/empty'
import LabelItem from '@/components/common/label-item'
import AnimatedDiv from '@/components/motion/animated-div'
import LabelListSkeleton from '@/components/skeleton/label-list'
import { PersonalContext } from '@/pages/personal-center'
import type { LabelInfo } from '@/utils/types'
import { FC, useEffect, useState, useContext } from 'react'

const LabelList: FC = () => {
  const { userId } = useContext(PersonalContext)

  const [labels, setLabels] = useState<LabelInfo[]>([])
  const [gettingLabels, setGettingLabels] = useState(true)

  const getLabels = async () => {
    setGettingLabels(true)
    try {
      const { data } = await getUserWorksLabelsAPI({ id: userId! })
      setLabels(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingLabels(false)
    }
  }

  useEffect(() => {
    getLabels()
  }, [userId])

  return (
    <div className='relative w-full min-h-10'>
      {labels.length !== 0 && !gettingLabels && (
        <AnimatedDiv type='opacity-gradient' className='flex gap-10px flex-wrap mb-5'>
          {labels.map((label) => (
            <LabelItem key={label.id} {...label} />
          ))}
        </AnimatedDiv>
      )}

      {labels.length === 0 && !gettingLabels && (
        <AnimatedDiv type='opacity-gradient'>
          <Empty showImg={false} />
        </AnimatedDiv>
      )}

      {labels.length === 0 && gettingLabels && (
        <AnimatedDiv type='opacity-gradient'>
          <LabelListSkeleton className='absolute top-0' />
        </AnimatedDiv>
      )}
    </div>
  )
}

export default LabelList
