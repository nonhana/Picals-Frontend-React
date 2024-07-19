import { FC, useState } from 'react'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'
import { CSSTransition } from 'react-transition-group'

type LazyImgProps = {
  width?: number | string
  height?: number | string
  imgLoaded?: (url: string) => void
} & React.ImgHTMLAttributes<HTMLImageElement>

const LazyImg: FC<LazyImgProps> = ({
  width = '100%',
  height = '100%',
  imgLoaded,
  className,
  src,
  alt,
}) => {
  const [imgLoading, setImgLoading] = useState(true)

  return (
    <div
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      className={`relative overflow-hidden ${className}`}>
      <img
        className='object-cover w-full h-full'
        src={src}
        alt={alt}
        loading='lazy'
        onLoad={() => {
          setImgLoading(false)
          imgLoaded && src && imgLoaded(src)
        }}
      />
      <CSSTransition in={imgLoading} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <ImgLoadingSkeleton className='absolute top-0 left-0' />
      </CSSTransition>
    </div>
  )
}

export default LazyImg
