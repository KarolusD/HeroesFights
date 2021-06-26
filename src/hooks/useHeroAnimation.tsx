import { useMotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { useDimensions } from './useDimensions'

export const useHeroAnimation = (side: 'left' | 'right') => {
  const { windowWidth, windowHeight } = useDimensions()

  const heroX = useMotionValue('0')
  const heroY = useMotionValue('0')
  const heroScale = useMotionValue(0)
  const heroHeight = useMotionValue('auto')

  useEffect(() => {
    if (windowWidth <= 360) {
      heroX.set(side === 'left' ? '-12vw' : '12vw')
      heroY.set(side === 'left' ? '-24vh' : '-76vh')
      heroScale.set(0.4)
      // heroHeight.set('160px')
    } else if (windowWidth <= 768) {
      heroX.set(side === 'left' ? '-12vw' : '12vw')
      heroY.set(side === 'left' ? '4vh' : '-12vh')
      heroScale.set(0.6)
      heroHeight.set('160px')
    } else {
      heroX.set(side === 'left' ? `-14vw` : '14vw')
      heroY.set(`${windowHeight / 4.25}px`)
      heroScale.set(1)
      heroHeight.set('auto')
    }
  }, [side, windowWidth, windowHeight])

  const heroVariants = {
    default: {
      x: 0,
      y: 0,
      scale: 1,
      height: 'auto',
    },
    fighting: {
      x: heroX.get(),
      y: heroY.get(),
      scale: heroScale.get(),
      height: heroHeight.get(),
    },
  }

  const heroTransition = {
    type: 'ease',
    duration: 0.4,
  }

  return { heroVariants, heroTransition }
}
