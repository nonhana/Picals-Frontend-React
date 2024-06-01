import { FC } from 'react'
import { Link } from 'react-router-dom'

type LabelImgItemProps = {
  id: string
  name: string
  color: string
  cover: string | null
}

const LabelImgItem: FC<LabelImgItemProps> = ({ name, color, cover }) => {
  return (
    <Link
      to={`/search-result?label=${name}&type=work&sortType=new`}
      className='relative flex-shrink-0 w-118px h-118px rd-6px overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-80'>
      <img
        className='w-118px'
        src={cover || `https://dummyimage.com/400x400/${color.slice(1)}/ffffff&text=${name}`}
        alt={name}
      />
      <div className='absolute w-118px h-118px top-0 left-0 bg-black opacity-32' />
      <span className='absolute bottom-20px left-1/2 -translate-x-50% color-#fff font-size-14px font-bold'>
        #{name}
      </span>
    </Link>
  )
}

export default LabelImgItem
