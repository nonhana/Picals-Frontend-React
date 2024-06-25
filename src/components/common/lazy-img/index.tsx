import { FC, useState } from 'react'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { CSSTransition } from 'react-transition-group'

type LazyImgProps = {
  width?: number | string
  height?: number | string
} & React.ImgHTMLAttributes<HTMLImageElement>

const LazyImg: FC<LazyImgProps> = ({ width = '100%', height = '100%', src, alt }) => {
  const [imgLoading, setImgLoading] = useState(true)

  return (
    <>
      <img
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        className='object-cover'
        src={src}
        alt={alt}
        loading='lazy'
        onLoad={() => {
          setImgLoading(false)
        }}
      />
      <CSSTransition in={imgLoading} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <ImgLoadingSkeleton className='absolute top-0 left-0' />
      </CSSTransition>
    </>
  )
}

export default LazyImg
