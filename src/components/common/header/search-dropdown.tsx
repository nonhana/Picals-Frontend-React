import { getRecommendLabelListAPI } from '@/apis'
import LayoutList from '@/components/common/layout-list'
import { clear } from '@/store/modules/searchHistory'
import type { AppState } from '@/store/types'
import type { LabelInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Modal, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'

import Empty from '../empty'
import LabelImgItem from '../label-img-item'
import LabelItem from '../label-item'

const { confirm } = Modal

const SearchDropdown: FC<{
  visible: boolean
  className?: string
  setVisible: (visible: boolean) => void
  setKeyword: (keyword: string) => void
}> = ({ visible, className, setVisible, setKeyword }) => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { likedLabels } = useSelector((state: AppState) => state.user)
  const { historyList } = useSelector((state: AppState) => state.searchHistory)

  const [messageApi, contextHolder] = message.useMessage()

  const toggleBodyOverflow = (visible: boolean) => {
    document.documentElement.style.overflow = visible ? 'hidden scroll' : ''
    document.body.style.overflow = visible ? 'hidden' : ''
    document.body.style.maxHeight = visible ? '100vh' : ''
  }

  useEffect(() => {
    toggleBodyOverflow(visible)
  }, [visible])

  // 清空历史记录
  const handleClearHistory = () => {
    dispatch(clear())
    messageApi.success('清除历史记录成功')
  }

  const [popularLabels, setPopularLabels] = useState<LabelInfo[]>([])

  const getRecommendLabelList = async () => {
    try {
      const { data } = await getRecommendLabelListAPI()
      setPopularLabels(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getRecommendLabelList()
  }, [])

  return (
    <AnimatePresence>
      {contextHolder}

      {visible && (
        <motion.div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 z-1999'
          onClick={() => setVisible(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {visible && (
        <motion.div
          className={`not-show-scrollbar absolute bg-white w-545px rd-6px overflow-hidden z-2000 ${className} select-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <div className='m-b-5'>
            <div className='w-full p-10px flex justify-between items-center'>
              <span className='font-bold font-size-m color-deepgrey'>历史记录</span>
              <span
                className='font-size-m color-deepgrey cursor-pointer'
                onClick={() => {
                  confirm({
                    title: '确定要清空历史记录吗？',
                    content: '一旦清除，不可恢复！',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: handleClearHistory,
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  })
                }}>
                清除历史记录
              </span>
            </div>
            {historyList.length === 0 ? (
              <div className='relative mx-10px'>
                <Empty showImg={false} />
              </div>
            ) : (
              <ul className='list-none m-0 p-0 max-h-40 overflow-y-scroll'>
                {historyList.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/search-result?label=${item}&type=work&sortType=new`}
                      onClick={() => setKeyword(item)}
                      className='cursor-pointer p-10px flex justify-between items-center font-size-m color-deepgrey hover:bg-normal transition-duration-300'>
                      <span>{item}</span>
                      <Icon width={'20px'} color='#858585' icon='ant-design:export-outlined' />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isLogin && (
            <div className='relative m-b-5'>
              <div className='w-full p-10px font-bold font-size-m color-deepgrey'>
                <span>喜欢的标签</span>
              </div>
              {likedLabels.length === 0 ? (
                <div className='relative mx-10px'>
                  <Empty showImg={false} />
                </div>
              ) : (
                <LayoutList className='px-10px' scrollType='label'>
                  {likedLabels.map((item) => (
                    <LabelItem key={item.id} {...item} />
                  ))}
                </LayoutList>
              )}
            </div>
          )}

          <div className='relative m-b-5'>
            <div className='w-full p-10px font-bold font-size-m color-deepgrey'>
              <span>最近流行的插画标签</span>
            </div>
            {popularLabels.length === 0 ? (
              <div className='relative mx-10px'>
                <Empty showImg={false} />
              </div>
            ) : (
              <LayoutList className='px-10px' scrollType='label-img'>
                {popularLabels.map((item) => (
                  <LabelImgItem key={item.id} {...item} />
                ))}
              </LayoutList>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchDropdown
