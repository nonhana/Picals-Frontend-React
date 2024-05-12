import { FC, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

type AutoTopProps = {
  children: React.ReactNode
}

const AutoTop: FC<AutoTopProps> = ({ children }) => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return <>{children}</>
}

export default AutoTop
