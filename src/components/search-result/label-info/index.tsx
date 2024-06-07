import { FC, useEffect, useState } from 'react'
import type { LabelDetailInfo } from '@/utils/types'
import { Button } from 'antd'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'
import { isWarmHue } from '@/utils'
import { labelActionsAPI, getRecommendLabelListAPI } from '@/apis'
import type { LabelInfo } from '@/utils/types'

type LabelInfoProps = LabelDetailInfo & {
  like: () => void
}

const LabelInfo: FC<LabelInfoProps> = ({ id, name, color, cover, isMyLike, workCount, like }) => {
  const handleLike = async () => {
    try {
      await labelActionsAPI({ id })
      like()
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const [labelList, setLabelList] = useState<LabelInfo[]>([])

  const getRecommendLabelList = async () => {
    try {
      const { data } = await getRecommendLabelListAPI()
      setLabelList(data.filter((item) => item.id !== id))
    } catch (error) {
      console.log('出现错误了喵！！', error)
    }
  }

  useEffect(() => {
    getRecommendLabelList()
  }, [id])

  return (
    <div className='relative w-100% flex flex-col mb-30px'>
      <div className='w-100% flex justify-between mb-20px items-center'>
        <div className='flex gap-5'>
          <div className='w-30 h-30 rd-2 border-solid border-2px border-#fff overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={
                cover ||
                `https://dummyimage.com/400x400/${color.slice(1)}/${isWarmHue(color) ? '3d3d3d' : 'ffffff'}&text=${name}`
              }
              alt={name}
            />
          </div>
          <div className='flex flex-col gap-5 color-#3d3d3d font-size-24px font-bold'>
            <div>
              <span>{name}</span>
            </div>
            <div>
              <span>{workCount}</span>
              <span className='font-normal font-size-24px'>作品</span>
            </div>
          </div>
        </div>
        {isMyLike ? (
          <Button type='default' size='large' shape='round' onClick={handleLike}>
            移除喜欢的标签
          </Button>
        ) : (
          <Button type='primary' size='large' shape='round' onClick={handleLike}>
            添加喜欢的标签
          </Button>
        )}
      </div>
      <LayoutList scrollType='label'>
        {labelList.map((item) => (
          <LabelItem key={item.id} {...item} />
        ))}
      </LayoutList>
    </div>
  )
}

export default LabelInfo
