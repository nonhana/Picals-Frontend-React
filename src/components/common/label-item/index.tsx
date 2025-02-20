import { isWarmHue } from '@/utils'
import { FC } from 'react'
import { Link } from 'react-router'

type LabelItemProps = {
  id: string
  name: string
  color: string
}

const LabelItem: FC<LabelItemProps> = ({ name, color }) => {
  return (
    <Link
      to={`/search-result?label=${name}&type=work&sortType=new`}
      className='select-none flex items-center h-10 flex-shrink-0 rd-1 px-6 text-sm cursor-pointer hover:opacity-80'
      style={{ backgroundColor: color }}>
      <span className={`${isWarmHue(color) ? 'color-neutral-900' : 'color-white'}`}>#{name}</span>
    </Link>
  )
}

export default LabelItem
