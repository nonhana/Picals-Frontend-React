import type { FC } from 'react'
import { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

interface FavoriteWorkListSkeletonProps {
  row?: number
  column?: number
  padding?: number
  borderRadius?: number
  [key: string]: any
}

const FavoriteWorkListSkeleton: FC<FavoriteWorkListSkeletonProps> = ({
  row = 1,
  column = 4,
  padding = 20,
  borderRadius = 4,
  ...props
}) => {
  const width = 796
  const list = []

  let height

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < column; j++) {
      const itemWidth = (width - padding * (column - 1)) / column
      const x = j * (itemWidth + padding)
      const height1 = itemWidth
      const height2 = 20
      const height3 = 20
      const space = padding + height1 + (padding / 2 + height2) + height3 + padding * 2
      const y1 = space * (i - 1)
      const y2 = y1 + padding + height1
      const y3 = y2 + padding / 2 + height2
      list.push(
        <Fragment key={`${i}-${j}`}>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2} />
          <rect x={x} y={y3} rx={0} ry={0} width={itemWidth * 0.6} height={height3} />
        </Fragment>,
      )

      if (i === row) {
        height = y3 + height3
      }
    }
  }

  return (
    <ContentLoader viewBox={`0 0 ${width} ${height}`} width={width} height={height} {...props}>
      {list}
    </ContentLoader>
  )
}

export default FavoriteWorkListSkeleton
