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
    if (windowWidth <= 768) {
      heroX.set(side === 'left' ? '-24vw' : '24vw')
      heroY.set('0')
      heroScale.set(0.6)
      heroHeight.set('140px')
    } else {
      heroX.set(side === 'left' ? '-16vw' : '16vw')
      heroY.set('10vw')
      heroScale.set(1)
      heroHeight.set('auto')
    }
  }, [heroX, heroY, heroScale, heroHeight, side, windowWidth])

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
    duration: 0.6,
    delay: 0.2,
  }

  return { heroVariants, heroTransition }
}
