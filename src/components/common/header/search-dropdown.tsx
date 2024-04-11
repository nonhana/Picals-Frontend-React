import { FC } from 'react'
import { Icon } from '@iconify/react'
import { CSSTransition } from 'react-transition-group'
import { Modal, message } from 'antd'
import LabelItem from '../label-item'
import LabelImgItem from '../label-img-item'
import LayoutList from '@/components/common/layout-list'
import { labelList, historyList } from '@/test/data'

const SearchDropdown: FC<{
  visible: boolean
  className?: string
  setVisible: (visible: boolean) => void
}> = ({ visible, className, setVisible }) => {
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <>
      {contextHolder}

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 z-1999'
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className={`not-show-scrollbar absolute bg-#fff w-545px rd-6px overflow-hidden z-2000 ${className} select-none`}>
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
            <LayoutList className='px-10px' scrollType='label'>
              {labelList.map((item) => (
                <LabelItem key={item.id} {...item} />
              ))}
            </LayoutList>
          </div>

          <div className='relative m-b-5'>
            <div className='w-full p-10px font-bold font-size-14px color-#6d757a'>
              <span>最近流行的插画标签</span>
            </div>
            <LayoutList className='px-10px' scrollType='label-img'>
              {labelList.map((item) => (
                <LabelImgItem key={item.id} {...item} />
              ))}
            </LayoutList>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default SearchDropdown
