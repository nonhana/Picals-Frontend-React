import type { FC } from 'react'
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

const WHITE_LIST = ['personal-center']

interface AutoTopProps {
  children: React.ReactNode
}

const AutoTop: FC<AutoTopProps> = ({ children }) => {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    if (WHITE_LIST.includes(pathname.split('/')[1]))
      return
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

export default AutoTop
