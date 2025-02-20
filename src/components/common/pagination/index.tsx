import paginationLeft from '@/assets/svgs/pagination-left.svg'
import paginationMore from '@/assets/svgs/pagination-more.svg'
import paginationRight from '@/assets/svgs/pagination-right.svg'
import { FC } from 'react'

type PaginationProps = {
  total: number
  pageSize: number
  current: number
  size?: 'small' | 'default'
  onChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({
  total,
  pageSize,
  current,
  size = 'default',
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize) || 1

  const stepPage = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      if (current === 1) return
      onChange(current - 1)
    } else {
      if (current === totalPages) return
      onChange(current + 1)
    }
  }

  const maxButtonCount = size === 'default' ? 7 : 5
  const sideButtonCount = (maxButtonCount - 3) / 2

  const renderButtons = () => {
    const buttons = []
    let start = 1
    let end = totalPages

    if (totalPages > maxButtonCount) {
      start = Math.max(current - sideButtonCount, 2)
      end = Math.min(current + sideButtonCount, totalPages - 1)

      if (current + 1 < maxButtonCount - 1) {
        end = maxButtonCount - 1
      }

      if (current > totalPages - maxButtonCount + 2) {
        start = totalPages - maxButtonCount + 2
      }
    }

    if (start !== 1) {
      buttons.push(
        <div
          key={1}
          className={`rd-full shrink-0 cursor-pointer flex items-center justify-center font-bold ${buttonClass(current === 1)}`}
          onClick={() => onChange(1)}>
          <span className={`${textColorClass(current === 1)}`}>1</span>
        </div>,
      )
    }

    if (start > 2) {
      buttons.push(
        <div key='left-ellipsis' className='cursor-pointer flex items-center justify-center'>
          <img className={imgClass()} src={paginationMore} alt='more' />
        </div>,
      )
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          className={`rd-full shrink-0 cursor-pointer flex items-center justify-center font-bold ${buttonClass(i === current)}`}
          onClick={() => onChange(i)}>
          <span className={`${textColorClass(i === current)}`}>{i}</span>
        </div>,
      )
    }

    if (end < totalPages - 1) {
      buttons.push(
        <div key='right-ellipsis' className='cursor-pointer flex items-center justify-center'>
          <img className={imgClass()} src={paginationMore} alt='more' />
        </div>,
      )
    }

    if (end !== totalPages && totalPages > 1) {
      buttons.push(
        <div
          key={totalPages}
          className={`rd-full shrink-0 cursor-pointer flex items-center justify-center font-bold ${buttonClass(current === totalPages)}`}
          onClick={() => onChange(totalPages)}>
          <span className={`${textColorClass(current === totalPages)}`}>{totalPages}</span>
        </div>,
      )
    }

    return buttons
  }

  const containerClass = size === 'small' ? 'gap-2.5' : 'gap-5'
  const buttonClass = (isActive: boolean) =>
    `w-${size === 'small' ? '6' : '10'} h-${size === 'small' ? '6' : '10'} ${isActive ? 'bg-black' : 'hover-bg-neutral-50'}`
  const imgClass = () => `w-${size === 'small' ? '3.6' : '6'} h-${size === 'small' ? '3' : '6'}`
  const textColorClass = (isActive: boolean) => (isActive ? 'color-white' : 'color-neutral')

  return (
    <div className={`relative flex px-20px py-10px select-none ${containerClass}`}>
      <div
        className={`rd-full cursor-pointer flex items-center justify-center ${buttonClass(false)}`}
        onClick={() => stepPage('prev')}>
        <img className={imgClass()} src={paginationLeft} alt='left-button' />
      </div>

      {renderButtons()}

      <div
        className={`rd-full cursor-pointer flex items-center justify-center ${buttonClass(false)}`}
        onClick={() => stepPage('next')}>
        <img className={imgClass()} src={paginationRight} alt='right-button' />
      </div>
    </div>
  )
}

export default Pagination
