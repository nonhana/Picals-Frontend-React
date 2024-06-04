import { FC } from 'react'
import empty from '@/assets/imgs/empty.png'

type EmptyProps = {
  className?: string
  width?: number | string
  height?: number | string
  text?: string
  showImg?: boolean
}

const Empty: FC<EmptyProps> = ({
  width = '100%',
  height = '100%',
  text = '暂无数据',
  showImg = 'true',
  className = '',
}) => {
  return (
    <div
      style={{ width, height }}
      className={`select-none py-5 relative flex flex-col gap-5 items-center justify-center bg-#f8f8f8 rd-1 ${className}`}>
      <div className='absolute top-0 left-0 w-full h-full z-1' />
      {showImg && <img className='w-50 rd-1' src={empty} alt='empty' />}
      <span className='color-#858585 font-size-14px font-bold'>{text}</span>
    </div>
  )
}

export default Empty
