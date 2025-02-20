import type { FC } from 'react'
import ContentLoader from 'react-content-loader'

interface ImgLoadingSkeletonProps {
  width?: number | string
  height?: number | string
  [key: string]: any
}

const ImgLoadingSkeleton: FC<ImgLoadingSkeletonProps> = ({
  width = '100%',
  height = '100%',
  ...props
}) => {
  return (
    <ContentLoader width={width} height={height} {...props}>
      <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
    </ContentLoader>
  )
}

export default ImgLoadingSkeleton
