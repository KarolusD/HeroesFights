import { useState, useEffect } from 'react'

export const useDimensions = () => {
  const [size, setSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
