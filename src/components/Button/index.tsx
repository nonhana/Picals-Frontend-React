import { FC, PropsWithChildren, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type tColor = 'black' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'

interface IButtonProps {
  color: tColor
  icon?: string
  link?: boolean
}

type NativeButtonProps = IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = IButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = Partial<NativeButtonProps | AnchorButtonProps>

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { color = 'blue', icon, link, children, ...restProps } = props
  if (link) {
    return <a {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>
  } else {
    return (
      <button
        className={`
    py-2 
    px-4 
    font-semibold 
    rounded-lg 
    shadow-md 
    text-white 
    bg-${color}-500 
    hover:bg-${color}-700 
    cursor-pointer 
    border-none 
    m-1
  `}
        {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {icon && <i className={`i-mdi-${icon} p-2`}></i>}
        {children}
      </button>
    )
  }
}

export default Button
