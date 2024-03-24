import { FC } from 'react'

// 判断是冷色调还是暖色调
const isWarmColor = (color: string) => {
  return parseInt(color.slice(1, 3), 16) > parseInt(color.slice(5, 8), 16)
}

type LabelItemProps = {
  id: string
  name: string
  color: string
}

const LabelItem: FC<LabelItemProps> = ({ name, color }) => {
  return (
    <div
      className='flex items-center h-10 flex-shrink-0 rd-1 px-6 font-size-14px cursor-pointer hover:opacity-80'
      style={{ backgroundColor: color }}
      data-testid={`label-item-${name}`}>
      <span className={`${isWarmColor(color) ? 'color-#000' : 'color-#fff'}`}>#{name}</span>
    </div>
  )
}

export default LabelItem
