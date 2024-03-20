import { FC } from 'react'

type LabelItemProps = {
  id: string
  name: string
  color: string
}

const LabelItem: FC<LabelItemProps> = ({ name, color }) => {
  return (
    <div
      className={`flex items-center h-10 flex-shrink-0 rd-1 px-6 font-size-14px color-#fff cursor-pointer hover:opacity-80 bg-${color}`}>
      <span>#{name}</span>
    </div>
  )
}

export default LabelItem
