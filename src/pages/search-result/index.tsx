import { FC, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { PictureOutlined, UserOutlined } from '@ant-design/icons'
import { SearchFilter } from '@/utils/types'
import { labelDetailInfo } from '@/test/data'
import LabelInfo from '@/components/search-result/label-info'
import WorkList from '@/components/search-result/work-list'
import UserList from '@/components/search-result/user-list'

const items: MenuProps['items'] = [
  {
    label: '插画',
    key: 'work',
    icon: <PictureOutlined />,
  },
  {
    label: '用户',
    key: 'user',
    icon: <UserOutlined />,
  },
]

const SearchResult: FC = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const searchFilter: SearchFilter = {
    label: query.get('label') || '',
    type: query.get('type') || 'work',
    sortType: query.get('sortType') || 'new',
  }
  const [current, setCurrent] = useState(searchFilter.type || 'work')
  const [width, setWidth] = useState<number>(1245)
  const exploreRef = useRef<HTMLDivElement>(null)
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  const checkoutMenu: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    navigate({
      search: `?type=${e.key}&label=${searchFilter.label}&sortType=${searchFilter.sortType}`,
    })
  }

  return (
    <div ref={exploreRef} className='relative overflow-hidden w-100% my-30px'>
      <div
        style={{
          width: `${width}px`,
          marginTop: current === 'work' ? '0' : '-210px',
        }}
        className='flex flex-col items-center mx-auto transition-all duration-300 ease-in-out'>
        <LabelInfo {...labelDetailInfo} />
        <Menu
          className='w-100%'
          onClick={checkoutMenu}
          selectedKeys={[current]}
          mode='horizontal'
          items={items}
        />
        {current === 'work' ? <WorkList /> : <UserList width={width} />}
      </div>
    </div>
  )
}

export default SearchResult
