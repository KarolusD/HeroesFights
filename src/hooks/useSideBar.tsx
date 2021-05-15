import { useEffect, useState } from 'react'
import { useDimensions } from './useDimensions'
import { useHerosContext } from './useHerosContext'

export const useSideBar = () => {
  const ClOSE_SIDEBAR_MAX_WIDTH = 1365
  const { windowWidth } = useDimensions()
  const {
    state: { isHerosFighting },
  } = useHerosContext()

  const [isOpen, setIsOpen] = useState(ClOSE_SIDEBAR_MAX_WIDTH < windowWidth)

  useEffect(() => {
    if (ClOSE_SIDEBAR_MAX_WIDTH < windowWidth && !isHerosFighting) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [windowWidth, isHerosFighting])

  return [isOpen, setIsOpen] as const
}
