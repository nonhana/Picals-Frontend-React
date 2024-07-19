import { getLabelDetailAPI, newLabelAPI } from '@/apis'
import Empty from '@/components/common/empty'
import HanaModal from '@/components/common/hana-modal'
import LabelInfo from '@/components/search-result/label-info'
import UserList from '@/components/search-result/user-list'
import WorkList from '@/components/search-result/work-list'
import { addRecord } from '@/store/modules/searchHistory'
import { SearchFilter } from '@/utils/types'
import type { LabelDetailInfo } from '@/utils/types'
import { PictureOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Button, Input, message } from 'antd'
import type { MenuProps } from 'antd'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom'

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
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const query = useSearchParams()[0]
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
    navigate({
      search: `?label=${searchFilter.label}&type=${e.key}&sortType=${searchFilter.sortType}`,
    })
  }

  useEffect(() => {
    setCurrent(searchFilter.type || 'work')
  }, [searchFilter.type])

  const [labelDetail, setLabelDetail] = useState<LabelDetailInfo>()

  const getLabelDetail = useCallback(async () => {
    try {
      const { data } = await getLabelDetailAPI({ name: searchFilter.label })
      if (data) {
        setLabelDetail(data)
      } else {
        setLabelDetail(undefined)
      }
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }, [searchFilter.label])

  const likeLabel = () => setLabelDetail((prev) => ({ ...prev!, isMyLike: !prev!.isMyLike }))

  const [showAddLabelModal, setShowAddLabelModal] = useState(false)
  const [labelName, setLabelName] = useState('')

  useEffect(() => {
    getLabelDetail()
    setLabelName(searchFilter.label || '')
    dispatch(addRecord(searchFilter.label))
  }, [dispatch, getLabelDetail, searchFilter.label])

  const confirmAddLabel = async () => {
    if (!labelName) return
    try {
      await newLabelAPI([{ value: labelName }])
      getLabelDetail()
      setShowAddLabelModal(false)
      message.success('添加标签成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  return (
    <>
      <div ref={exploreRef} className='relative overflow-hidden w-full my-30px'>
        <div
          style={{
            width: `${width}px`,
            marginTop: current === 'work' ? '0' : '-210px',
          }}
          className='flex flex-col items-center mx-auto transition-all duration-300 ease-in-out'>
          {labelDetail ? (
            <LabelInfo {...labelDetail} like={likeLabel} />
          ) : (
            <div className='relative w-full h-210px'>
              <Empty showImg={false} text='目前暂未收录该标签哦~'>
                <Button
                  size='large'
                  shape='round'
                  type='primary'
                  onClick={() => {
                    setShowAddLabelModal(true)
                  }}>
                  添加标签
                </Button>
              </Empty>
            </div>
          )}
          <Menu
            className='w-full'
            onClick={checkoutMenu}
            selectedKeys={[current]}
            mode='horizontal'
            items={items}
          />
          {current === 'work' ? (
            labelDetail ? (
              <WorkList
                labelName={labelDetail.name}
                sortType={searchFilter.sortType}
                workCount={labelDetail.workCount}
              />
            ) : (
              <div className='relative w-full pt-5'>
                <Empty />
              </div>
            )
          ) : (
            <UserList labelName={searchFilter.label} width={width} />
          )}
        </div>
      </div>

      <HanaModal
        title='添加标签'
        visible={showAddLabelModal}
        setVisible={setShowAddLabelModal}
        onOk={confirmAddLabel}>
        <Input
          className='w-90% mx-auto my-10'
          size='large'
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder='请输入新标签名称'
        />
      </HanaModal>
    </>
  )
}

export default SearchResult
