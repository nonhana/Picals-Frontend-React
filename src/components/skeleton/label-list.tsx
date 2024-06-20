import { FC, Fragment, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

type LabelListSkeletonProps = {
  row?: number
  padding?: number
  borderRadius?: number
  [key: string]: any
}

const LabelListSkeleton: FC<LabelListSkeletonProps> = ({
  row = 1,
  padding = 10,
  borderRadius = 4,
  ...props
}) => {
  const [width, setWidth] = useState<number>(1245)
  const [column, setColumn] = useState<number>(12)
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
      setColumn(10)
    } else {
      setWidth(1245)
      setColumn(12)
    }
  }, [currentWidth])

  const list = []

  let height

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < column; j++) {
      const itemWidth = (width - padding * (column + 1)) / column
      const x = j * (itemWidth + padding)
      const height1 = 40
      const space = padding + height1 + padding / 2 + padding * 2
      const y1 = space * (i - 1)
      const y2 = y1 + height1
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
        </Fragment>,
      )
      if (i === row) height = y2
    }
  }

  return (
    <ContentLoader viewBox={`0 0 ${width} ${height}`} width={width} height={height} {...props}>
      {list}
    </ContentLoader>
  )
}

export default LabelListSkeleton
