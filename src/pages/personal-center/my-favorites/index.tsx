import { FC } from 'react'
import { favoriteDetailInfo } from '@/test/data'
import Sidebar from '@/components/personal-center/favorites/sidebar'
import Header from '@/components/personal-center/favorites/header'

const MyFavorites: FC = () => {
  return (
    <div className='flex border-solid border-1px border-color-#858585'>
      <Sidebar />
      <div>
        <Header {...favoriteDetailInfo} />
      </div>
    </div>
  )
}

export default MyFavorites
