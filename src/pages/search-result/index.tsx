import { FC, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { PictureOutlined, UserOutlined } from '@ant-design/icons'
import { useWinChange } from '@/hooks'
import { SearchFilter } from '@/utils/types'
import { labelDetailInfo } from '@/test/data'
import LabelInfo from '@/components/search-result/label-info'
import WorkList from '@/components/search-result/work-list'

const items: MenuProps['items'] = [
  {
    label: '插画',
    key: 'works',
    icon: <PictureOutlined />,
  },
  {
    label: '用户',
    key: 'users',
    icon: <UserOutlined />,
  },
]

const SearchResult: FC = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const searchFilter: SearchFilter = {
    label: query.get('label') || '',
    type: query.get('type') as 'work' | 'user',
    sortType: query.get('sortType') as 'new' | 'old' | 'like' | 'collect',
  }
  const [current, setCurrent] = useState('works')
  const [width, setWidth] = useState<number>(1245)
  const exploreRef = useRef<HTMLDivElement>(null)
  const currentWidth = useWinChange(exploreRef)

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  const checkoutMenu: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <div ref={exploreRef} className='relative w-100% my-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col items-center mx-auto'>
        {searchFilter.type === 'work' && <LabelInfo {...labelDetailInfo} />}
        <Menu
          className='w-100%'
          onClick={checkoutMenu}
          selectedKeys={[current]}
          mode='horizontal'
          items={items}
        />
        {current === 'works' ? <WorkList /> : null}
      </div>
    </div>
  )
}

export default SearchResult
