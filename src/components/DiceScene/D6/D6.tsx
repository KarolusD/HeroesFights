import { useBox } from '@react-three/cannon'
import { Box } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Euler, Vector3 } from 'three'

interface IDie {
  castShadow?: boolean
  walls: string[]
  impulse: number[]
  position: number[]
  rotation?: number[]
}

const SIDES = 6
const POSSIBLE_ROTATIONS = [0, -Math.PI / 2, -Math.PI, Math.PI / 2, Math.PI]

const D6 = ({ walls, impulse, position, rotation, ...props }: IDie) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position,
    rotation: rotation || [Math.random(), Math.random(), Math.random()],
    ...props,
  }))

  useEffect(() => {
    api.applyImpulse(impulse, [0, 0, 0])
  }, [])

  let previousPosition: Vector3 | undefined

  useFrame(() => {
    console.log(previousPosition, ref.current?.position)
    // if (
    //   previousPosition &&
    //   previousPosition.x === ref.current?.position.x &&
    //   previousPosition.y === ref.current?.position.y &&
    //   previousPosition.z === ref.current?.position.z
    // ) {
    //   const face = whichFaceIsUp(ref.current?.rotation)
    // }
    previousPosition = ref.current?.position
    // console.log(face, '<--- face')
  })

  const closestToPossibleRotation = (axisRotation?: number) => {
    if (!axisRotation) return 0
    return POSSIBLE_ROTATIONS.reduce((prev, curr) => {
      return Math.abs(curr - axisRotation) < Math.abs(prev - axisRotation)
        ? curr
        : prev
    })
  }

  const whichFaceIsUp = (rotation: Euler | undefined) => {
    const rotationX = closestToPossibleRotation(rotation?.x)
    const rotationZ = closestToPossibleRotation(rotation?.z)

    // refactor this to something shorter
    switch (rotationZ) {
      case 0: // 0 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === 0) return 3
        if (Math.abs(rotationX) === Math.PI) return 4
        if (rotationX === -Math.PI / 2) return 5
        break
      case -Math.PI / 2: // -90 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === 0) return 6
        if (Math.abs(rotationX) === Math.PI) return 1
        if (rotationX === -Math.PI / 2) return 5
        break
      case Math.PI / 2: // 90 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === 0) return 1
        if (Math.abs(rotationX) === Math.PI) return 6
        if (rotationX === -Math.PI / 2) return 5
        break
      case Math.PI || -Math.PI: // 180 or -180 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === 0) return 4
        if (Math.abs(rotationX) === Math.PI) return 3
        if (rotationX === -Math.PI / 2) return 5
        break
    }
    return 3 // default value for a die which is not possible to recognize
  }

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
