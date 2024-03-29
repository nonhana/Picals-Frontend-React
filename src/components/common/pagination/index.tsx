import { FC } from 'react'
import paginationLeft from '@/assets/svgs/pagination-left.svg'
import paginationRight from '@/assets/svgs/pagination-right.svg'
import paginationMore from '@/assets/svgs/pagination-more.svg'

type PaginationProps = {
  total: number
  pageSize: number
  current: number
  onChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ total, pageSize, current, onChange }) => {
  // 计算得出总共的页数
  const totalPages = Math.ceil(total / pageSize)

  // 递增/递减页数
  const stepPage = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      if (current === 1) return
      onChange(current - 1)
    } else {
      if (current === totalPages) return
      onChange(current + 1)
    }
  }

  const maxButtonCount = 7 // 最多显示的按钮数（包括省略号）
  const sideButtonCount = 2 // current两侧的按钮数

  const renderButtons = () => {
    const buttons = []
    let start = 1
    let end = totalPages

    if (totalPages > maxButtonCount) {
      start = Math.max(current + 1 - sideButtonCount, 2)
      end = Math.min(current + 1 + sideButtonCount, totalPages - 1)

      if (current + 1 < maxButtonCount - 1) {
        end = maxButtonCount - 1
      }

      if (current + 1 > totalPages - maxButtonCount + 2) {
        start = totalPages - maxButtonCount + 2
      }
    }

    if (start !== 1) {
      buttons.push(
        <div
          key={1}
          className={`shrink-0 w-10 h-10 rd-full cursor-pointer flex items-center justify-center font-bold font-size-24px ${current === 1 ? 'bg-black' : 'bg-none hover-bg-#f2f2f2'}`}
          onClick={() => onChange(1)}>
          <span className={`${current === 1 ? 'color-white' : 'color-#858585'}`}>1</span>
        </div>,
      )
    }

    // 添加省略号
    if (start > 2) {
      buttons.push(
        <div
          key='left-ellipsis'
          className='w-10 h-10 cursor-pointer flex items-center justify-center'>
          <img className='w-6 h-6' src={paginationMore} alt='more' />
        </div>,
      )
    }

    // 添加中间的按钮
    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          className={`shrink-0 w-10 h-10 rd-full cursor-pointer flex items-center justify-center font-bold font-size-24px ${i === current ? 'bg-black' : 'bg-none hover-bg-#f2f2f2'}`}
          onClick={() => onChange(i)}>
          <span className={`${i === current ? 'color-white' : 'color-#858585'}`}>{i}</span>
        </div>,
      )
    }

    // 添加末尾的省略号
    if (end < totalPages - 1) {
      buttons.push(
        <div
          key='right-ellipsis'
          className='w-10 h-10 cursor-pointer flex items-center justify-center'>
          <img className='w-6 h-6' src={paginationMore} alt='more' />
        </div>,
      )
    }

    if (end !== totalPages && totalPages > 1) {
      buttons.push(
        <div
          key={totalPages}
          className={`shrink-0 w-10 h-10 rd-full cursor-pointer flex items-center justify-center font-bold font-size-24px ${current === totalPages ? 'bg-black' : 'bg-none hover-bg-#f2f2f2'}`}
          onClick={() => onChange(totalPages)}>
          <span className={`${current === totalPages ? 'color-white' : 'color-#858585'}`}>
            {totalPages}
          </span>
        </div>,
      )
    }

    return buttons
  }

  return (
    <div className='relative flex px-20px py-10px gap-20px select-none'>
      {/* 左侧按钮 */}
      <div
        className='w-10 h-10 rd-full cursor-pointer flex items-center justify-center hover-bg-#f2f2f2'
        onClick={() => stepPage('prev')}>
        <img className='w-6 h-6' src={paginationLeft} alt='left-button' />
      </div>

      {renderButtons()}

      {/* 右侧按钮 */}
      <div
        className='w-10 h-10 rd-full cursor-pointer flex items-center justify-center hover-bg-#f2f2f2'
        onClick={() => stepPage('next')}>
        <img className='w-6 h-6' src={paginationRight} alt='right-button' />
      </div>
    </div>
  )
}

export default Pagination
