import { useEffect, useState } from 'react'
import { useDimensions } from './useDimensions'
import { useHeroesContext } from './useHeroesContext'

export const useSideBar = () => {
  const ClOSE_SIDEBAR_MAX_WIDTH = 1365
  const { windowWidth } = useDimensions()
  const {
    state: { isHeroesFighting },
  } = useHeroesContext()

  const [isOpen, setIsOpen] = useState(ClOSE_SIDEBAR_MAX_WIDTH < windowWidth)

  useEffect(() => {
    if (ClOSE_SIDEBAR_MAX_WIDTH < windowWidth && !isHeroesFighting) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [windowWidth, isHeroesFighting])

  return [isOpen, setIsOpen] as const
}
