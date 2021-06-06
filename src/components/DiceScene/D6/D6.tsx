import { Box } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { useDie } from '_hooks/useDie'

interface IDie {
  castShadow?: boolean
  walls: string[]
  impulse: number[]
  position: number[]
  rotation?: number[]
}

const SIDES = 6

const D6 = ({ walls, impulse, position, rotation }: IDie) => {
  const { ref, faceUp } = useDie({ position, rotation, impulse })

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
