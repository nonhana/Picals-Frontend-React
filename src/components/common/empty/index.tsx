import { FC, useEffect, useState } from 'react'
import { random } from 'lodash'
import LazyLoad from 'react-lazyload'

// 动态导入所有图片
const images = import.meta.glob('@/assets/imgs/empty/*.(png|jpg|jpeg|svg)')
const emptyImgs: string[] = []

Object.keys(images).forEach(async (key) => {
  const module = (await images[key]()) as { default: string }
  emptyImgs.push(module.default)
})

type EmptyProps = {
  className?: string
  width?: number | string
  height?: number | string
  text?: string
  showImg?: boolean
  children?: React.ReactNode
}

const Empty: FC<EmptyProps> = ({
  width = '100%',
  height = '100%',
  text = '暂无数据',
  showImg = true,
  className = '',
  children,
}) => {
  const [randomImg, setRandomImg] = useState<string | undefined>(undefined)

  useEffect(() => {
    const randomIndex = random(0, emptyImgs.length - 1)
    setRandomImg(emptyImgs[randomIndex])
  }, [])

  return (
    <div
      style={{ width, height }}
      className={`select-none py-5 relative flex flex-col gap-5 items-center justify-center bg-#f8f8f8 rd-1 ${className}`}>
      {showImg && randomImg && (
        <LazyLoad height={200}>
          <img className='w-50 rd-1' src={randomImg} alt='empty' />
        </LazyLoad>
      )}
      <span className='color-#858585 font-size-14px font-bold'>{text}</span>
      {children}
    </div>
  )
}

export default Empty
