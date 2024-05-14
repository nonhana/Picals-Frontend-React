import { FC } from 'react'
import { Link } from 'react-router-dom'
import { isWarmHue } from '@/utils/colorHue'

type LabelItemProps = {
  id: string
  name: string
  color: string
}

const LabelItem: FC<LabelItemProps> = ({ name, color }) => {
  return (
    <Link
      to={`/search-result?label=${name}&type=work&sortType=new`}
      className='select-none flex items-center h-10 flex-shrink-0 rd-1 px-6 font-size-14px cursor-pointer hover:opacity-80'
      style={{ backgroundColor: color }}>
      <span className={`${isWarmHue(color) ? 'color-#000' : 'color-#fff'}`}>#{name}</span>
    </Link>
  )
}

export default LabelItem
