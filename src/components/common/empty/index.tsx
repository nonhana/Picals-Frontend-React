import { random } from 'lodash'
import { FC, useEffect, useState } from 'react'

import LazyImg from '../lazy-img'

// 动态导入所有图片
const images = import.meta.glob('@/assets/imgs/empty/*.(png|jpg|jpeg|svg)')
const emptyImgs: string[] = []

Object.keys(images).forEach(async (key) => {
  const module = (await images[key]()) as { default: string }
  emptyImgs.push(module.default)
})

type EmptyProps = {
  width?: number | string
  height?: number | string
  text?: string
  showImg?: boolean
  children?: React.ReactNode
  [key: string]: any
}

const Empty: FC<EmptyProps> = ({
  width = '100%',
  height = '100%',
  text = '暂无数据',
  showImg = true,
  children,
  ...props
}) => {
  const [randomImg, setRandomImg] = useState<string | undefined>(undefined)

  useEffect(() => {
    const randomIndex = random(0, emptyImgs.length - 1)
    setRandomImg(emptyImgs[randomIndex])
  }, [])

  return (
    <div
      {...props}
      style={{ width, height }}
      className={
        'z-100 select-none py-5 relative flex flex-col gap-5 items-center justify-center bg-neutral-50 rd-1'
      }>
      {showImg && randomImg && (
        <LazyImg className='rd-1' width={200} height={200} src={randomImg} alt='empty' />
      )}
      <span className='color-neutral text-sm font-bold'>{text}</span>
      {children}
    </div>
  )
}

export default Empty
