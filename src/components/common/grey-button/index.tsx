import { FC, ButtonHTMLAttributes } from 'react'

type GreyButtonProps = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLDivElement>

const GreyButton: FC<GreyButtonProps> = ({ className: extraClassName, children, onClick }) => {
  return (
    <div
      className={`flex-shrink-0 w-10 h-10 rounded-full bg-black opacity-8 flex items-center justify-center cursor-pointer transition-duration-300 hover:opacity-32 ${extraClassName}`}
      onClick={onClick}>
      {children}
    </div>
  )
}

export default GreyButton
