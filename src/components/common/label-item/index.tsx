import { FC } from 'react'
import { isWarnHue } from '@/utils/colorHue'

type LabelItemProps = {
  id: string
  name: string
  color: string
}

const LabelItem: FC<LabelItemProps> = ({ name, color }) => {
  return (
    <div
      className='flex items-center h-10 flex-shrink-0 rd-1 px-6 font-size-14px cursor-pointer hover:opacity-80'
      style={{ backgroundColor: color }}>
      <span className={`${isWarnHue(color) ? 'color-#000' : 'color-#fff'}`}>#{name}</span>
    </div>
  )
}

export default LabelItem
