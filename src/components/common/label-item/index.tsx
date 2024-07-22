import { isWarmHue } from '@/utils'
import { FC } from 'react'
import { Link } from 'react-router-dom'

type LabelItemProps = {
  id: string
  name: string
  color: string
}

const LabelItem: FC<LabelItemProps> = ({ name, color }) => {
  return (
    <Link
      to={`/search-result?label=${name}&type=work&sortType=new`}
      className='select-none flex items-center h-10 flex-shrink-0 rd-1 px-6 font-size-m cursor-pointer hover:opacity-80'
      style={{ backgroundColor: color }}>
      <span className={`${isWarmHue(color) ? 'color-shallowblack' : 'color-white'}`}>#{name}</span>
    </Link>
  )
}

export default LabelItem
