import { FC, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

type AutoTopProps = {
  children: React.ReactNode
}

const AutoTop: FC<AutoTopProps> = ({ children }) => {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    if (pathname.split('/')[1] === 'personal-center') return
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

export default AutoTop
