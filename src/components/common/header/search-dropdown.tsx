import { FC, useRef } from 'react'
import { Icon } from '@iconify/react'
import LabelItem from '../label-item'
import LabelImgItem from '../label-img-item'
import { CSSTransition } from 'react-transition-group'
import GreyButton from '../grey-button'
import { Modal, message } from 'antd'
// 测试用数据
import { labelList, historyList } from '@/test/data'

const SearchDropdown: FC<{
  visible: boolean
  className?: string
  setVisible: (visible: boolean) => void
}> = ({ visible, className, setVisible }) => {
  const [messageApi, contextHolder] = message.useMessage()

  // 获取DOM元素
  const likeLabelsRef = useRef<HTMLDivElement>(null)
  const popularLabelsRef = useRef<HTMLDivElement>(null)

  // 点击左右按钮，进行滚动
  const scrollX = (type: 'like' | 'popular', direction: 'left' | 'right') => {
    const scrollAmount = 400
    switch (type) {
      case 'like':
        if (likeLabelsRef.current) {
          likeLabelsRef.current.scrollBy({
            top: 0,
            left: direction === 'left' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
          })
        }
        break
      case 'popular':
        if (popularLabelsRef.current) {
          popularLabelsRef.current.scrollBy({
            top: 0,
            left: direction === 'left' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
          })
        }
        break
    }
  }

  return (
    <>
      {contextHolder}

      {/* 全屏蒙版，实现点击后关闭窗口 */}
      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-16 z-99'
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className={`not-show-scrollbar absolute bg-#fff w-545px rd-6px overflow-hidden z-100 ${className} select-none`}>
          <div className='m-b-5'>
            <div className='w-full p-10px flex justify-between items-center'>
              <span className='font-bold font-size-14px color-#6d757a'>历史记录</span>
              <span
                className='font-size-14px color-#6d757a cursor-pointer'
                onClick={() => {
                  Modal.confirm({
                    title: '确定要清空历史记录吗？',
                    content: '一旦清除，不可恢复！',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                      messageApi.success('清除成功！')
                    },
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
            <ul className='list-none m-0 p-0 max-h-40 overflow-y-scroll'>
              {historyList.map((item) => (
                <li
                  key={item.id}
                  className='cursor-pointer p-10px flex justify-between items-center font-size-14px color-#6d757a hover:bg-#f5f5f5 transition-duration-300'>
                  <span>{item.name}</span>
                  <Icon width={'20px'} color='#858585' icon='ant-design:export-outlined' />
                </li>
              ))}
            </ul>
          </div>

          <div className='relative m-b-5'>
            <div className='w-full p-10px font-bold font-size-14px color-#6d757a'>
              <span>喜欢的标签</span>
            </div>
            <GreyButton
              className='z-2 absolute bottom-10px left-10px'
              onClick={() => scrollX('like', 'right')}>
              <Icon color='#fff' icon='ant-design:caret-left-filled' />
            </GreyButton>
            <div
              ref={likeLabelsRef}
              className='relative w-full flex flex-nowrap p-10px gap-10px overflow-x-auto overflow-y-hidden transition-duration-300'>
              {labelList.map((item) => (
                <LabelItem key={item.id} {...item} />
              ))}
            </div>
            <GreyButton
              className='z-2 absolute bottom-10px right-10px'
              onClick={() => scrollX('like', 'left')}>
              <Icon color='#fff' icon='ant-design:caret-right-filled' />
            </GreyButton>
          </div>

          <div className='relative m-b-5'>
            <div className='w-full p-10px font-bold font-size-14px color-#6d757a'>
              <span>最近流行的插画标签</span>
            </div>
            <GreyButton
              className='z-2 absolute bottom-49px left-10px'
              onClick={() => scrollX('popular', 'right')}>
              <Icon color='#fff' icon='ant-design:caret-left-filled' />
            </GreyButton>
            <div
              ref={popularLabelsRef}
              className='relative w-full flex flex-nowrap p-10px gap-10px overflow-x-auto overflow-y-hidden'>
              {labelList.map((item) => (
                <LabelImgItem key={item.id} {...item} />
              ))}
            </div>
            <GreyButton
              className='z-2 absolute bottom-49px right-10px'
              onClick={() => scrollX('popular', 'left')}>
              <Icon color='#fff' icon='ant-design:caret-right-filled' />
            </GreyButton>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default SearchDropdown
