import { FC } from 'react'
import type { LabelDetailInfo } from '@/utils/types'
import { Button } from 'antd'
import { labelList } from '@/test/data'
import LabelItem from '@/components/common/label-item'
import LayoutList from '@/components/common/layout-list'

type LabelInfoProps = LabelDetailInfo

const LabelInfo: FC<LabelInfoProps> = ({ name, color, cover, isMyLike, workCount }) => {
  return (
    <div className='relative w-100% flex flex-col mb-30px'>
      <div className='w-100% flex justify-between mb-20px items-center'>
        <div className='flex gap-5'>
          <div className='w-30 h-30 rd-2 border-solid border-2px border-#fff overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={cover || `https://dummyimage.com/400x400/${color.slice(1)}/ffffff&text=${name}`}
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
          <Button type='default' size='large' shape='round'>
            管理喜欢的标签
          </Button>
        ) : (
          <Button type='primary' size='large' shape='round'>
            添加进喜欢的标签
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
