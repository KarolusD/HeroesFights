import { useEffect, useState } from 'react'
import { useDimensions } from './useDimensions'

export const useSideBar = () => {
  const ClOSE_SIDEBAR_MAX_WIDTH = 1365
  const { windowWidth } = useDimensions()
  const [isOpen, setIsOpen] = useState(ClOSE_SIDEBAR_MAX_WIDTH < windowWidth)

  useEffect(() => {
    if (ClOSE_SIDEBAR_MAX_WIDTH < windowWidth) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
    console.log(windowWidth)
  }, [windowWidth])

  return [isOpen, setIsOpen] as const
}
