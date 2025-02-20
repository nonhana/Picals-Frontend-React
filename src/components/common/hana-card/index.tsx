import { FC } from 'react'

const pageCenter = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'

type HanaCardProps = {
  className?: string
  width?: number | string
  height?: number | string
  children?: React.ReactNode
}

const HanaCard: FC<HanaCardProps> = ({
  className = '',
  width = 800,
  height = 'auto',
  children,
}) => {
  return (
    <div
      style={{ width, height }}
      className={`${className} ${pageCenter} min-h-100 rd-6 bg-white p-5 flex flex-col justify-center items-center gap-5 text-lg font-bold color-neutral-900`}>
      {children}
    </div>
  )
}

export default HanaCard
