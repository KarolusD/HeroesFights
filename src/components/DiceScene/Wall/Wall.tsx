import { usePlane } from '@react-three/cannon'
import { Plane } from '@react-three/drei'
import React from 'react'

interface WallProps {
  args?: [
    width?: number | undefined,
    height?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined
  ]
  color?: string
  position?: number[]
  rotation?: number[]
  floor?: boolean
}

const Wall = ({ args, color, position, rotation, floor }: WallProps) => {
  const [ref] = usePlane(() => ({
    rotation: rotation || [-Math.PI / 2, 0, 0],
    position: position || [0, 0, 0],
  }))
  return (
    <Plane ref={ref} receiveShadow={floor} args={args || [1000, 1000]}>
      <shadowMaterial attach="material" color={color || 'black'} />
    </Plane>
  )
}

export default Wall
