import { useBox } from '@react-three/cannon'
import { Box } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import * as THREE from 'three'

interface IDie {
  castShadow?: boolean
  walls: string[]
  impulse: number[]
  position: number[]
}

const SIDES = 6

const D6 = ({ walls, impulse, position, ...props }: IDie) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position,
    rotation: [Math.random(), Math.random(), Math.random()],
    ...props,
  }))

  useEffect(() => {
    api.applyImpulse(impulse, [0, 0, 0])
  }, [])

  return (
    <Box args={[1, 1, 1]} ref={ref} castShadow receiveShadow>
      {[...Array(SIDES)].map((_, i) => {
        const texture = useLoader(THREE.TextureLoader, walls[i])
        return (
          <meshPhongMaterial attachArray="material" map={texture} key={i} />
        )
      })}
    </Box>
  )
}

export default D6
