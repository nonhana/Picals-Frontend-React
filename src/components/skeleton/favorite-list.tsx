import type { FC } from 'react'
import { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

interface FavoriteListSkeletonProps {
  row?: number
  borderRadius?: number
  [key: string]: any
}

const FavoriteListSkeleton: FC<FavoriteListSkeletonProps> = ({
  row = 5,
  borderRadius = 4,
  ...props
}) => {
  const width = 250
  const list = []
  let height

  for (let i = 1; i <= row; i++) {
    const itemHeight = 60
    const y = itemHeight * (i - 1)

    // 图标
    const avatarSize = 24
    const avatarX = 22
    const avatarY = y + 18

    // 收藏夹名称
    const usernameWidth = 150
    const usernameHeight = 20
    const usernameX = avatarX + avatarSize + 10
    const usernameY = avatarY + 2

    list.push(
      <Fragment key={i}>
        <rect x={avatarX} y={avatarY} rx="50%" width={avatarSize} height={avatarSize} />
        <rect
          x={usernameX}
          y={usernameY}
          rx={borderRadius}
          ry={borderRadius}
          width={usernameWidth}
          height={usernameHeight}
        />
      </Fragment>,
    )

    if (i === row) {
      height = y + itemHeight
    }
  }

  return (
    <ContentLoader viewBox={`0 0 ${width} ${height}`} width={width} height={height} {...props}>
      {list}
    </ContentLoader>
  )
}

export default FavoriteListSkeleton
