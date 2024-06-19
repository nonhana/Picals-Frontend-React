import { FC, useEffect, useState, useContext } from 'react'
import type { LabelInfo } from '@/utils/types'
import LabelItem from '@/components/common/label-item'
import { getUserWorksLabelsAPI } from '@/apis'
import { PersonalContext } from '@/pages/personal-center'
import { CSSTransition } from 'react-transition-group'
import LabelListSkeleton from '@/components/skeleton/label-list'
import Empty from '@/components/common/empty'

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
    <div className='relative w-full min-h-15'>
      <CSSTransition
        in={labels.length !== 0 && !gettingLabels}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='flex gap-10px flex-wrap mb-5'>
          {labels.map((label) => (
            <LabelItem key={label.id} {...label} />
          ))}
        </div>
      </CSSTransition>

      <CSSTransition
        in={labels.length === 0 && !gettingLabels}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty showImg={false} />
      </CSSTransition>

      <CSSTransition
        in={labels.length === 0 && gettingLabels}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <LabelListSkeleton className='absolute top-0' />
      </CSSTransition>
    </div>
  )
}

export default LabelList
