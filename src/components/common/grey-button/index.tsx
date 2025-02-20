import type { ButtonHTMLAttributes, FC } from 'react'

type GreyButtonProps = {
  children: React.ReactNode
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLDivElement>

const GreyButton: FC<GreyButtonProps> = ({
  className: extraClassName,
  children,
  onClick,
  disabled = false,
}) => {
  // 根据 disabled 状态确定样式
  const buttonClasses = disabled
    ? 'flex-shrink-0 w-10 h-10 rounded-full bg-black opacity-8 flex items-center justify-center cursor-not-allowed'
    : 'flex-shrink-0 w-10 h-10 rounded-full bg-black opacity-8 flex items-center justify-center cursor-pointer transition-duration-300 hover:opacity-32'

  return (
    <div className={`${buttonClasses} ${extraClassName}`} onClick={disabled ? undefined : onClick}>
      {children}
    </div>
  )
}

export default GreyButton
