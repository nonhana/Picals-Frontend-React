import { labelActionsAPI, getRecommendLabelListAPI } from '@/apis'
import Empty from '@/components/common/empty'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'
import LazyImg from '@/components/common/lazy-img'
import LabelListSkeleton from '@/components/skeleton/label-list'
import { addLikedLabel, removeLikedLabel } from '@/store/modules/user'
import type { AppState } from '@/store/types'
import { isWarmHue } from '@/utils'
import type { LabelDetailInfo, LabelInfo } from '@/utils/types'
import { Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

type LabelInfoProps = LabelDetailInfo & {
  like: () => void
}

const LabelInfo: FC<LabelInfoProps> = ({ id, name, color, cover, isMyLike, workCount, like }) => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state: AppState) => state.user)

  const handleLike = async () => {
    try {
      await labelActionsAPI({ id })
      if (isMyLike) {
        dispatch(removeLikedLabel(id))
      } else {
        dispatch(addLikedLabel({ id, name, color, cover }))
      }
      like()
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const [labelList, setLabelList] = useState<LabelInfo[]>([])
  const [loading, setLoading] = useState(true)

  const getRecommendLabelList = async () => {
    setLoading(true)
    try {
      const { data } = await getRecommendLabelListAPI()
      setLabelList(data.filter((item) => item.id !== id))
    } catch (error) {
      console.log('出现错误了喵！！', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecommendLabelList()
  }, [id])

  return (
    <div className='relative w-full flex flex-col mb-30px'>
      <div className='w-full flex justify-between mb-20px items-center'>
        <div className='flex gap-5'>
          <div className='w-30 h-30 rd-2 b-solid b-2px b-white overflow-hidden'>
            <LazyImg
              src={
                cover ||
                `https://fakeimg.pl/200x200/${color.slice(1)}/${isWarmHue(color) ? '3d3d3d' : 'ffffff'}?retina=1&font=noto&text=${name}`
              }
              alt={name}
            />
          </div>
          <div className='flex flex-col gap-5 color-shallowblack font-size-24px font-bold'>
            <div>
              <span>{name}</span>
            </div>
            <div>
              <span>{workCount}</span>
              <span className='font-normal font-size-24px'>作品</span>
            </div>
          </div>
        </div>
        {isLogin &&
          (isMyLike ? (
            <Button type='default' size='large' shape='round' onClick={handleLike}>
              移除喜欢的标签
            </Button>
          ) : (
            <Button type='primary' size='large' shape='round' onClick={handleLike}>
              添加喜欢的标签
            </Button>
          ))}
      </div>
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
    </div>
  )
}

export default LabelInfo
