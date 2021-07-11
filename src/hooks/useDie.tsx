import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { Euler } from 'three'

interface IDie {
  impulse: number[]
  position: number[]
  rotation?: number[]
}

const POSSIBLE_ROTATIONS = [0, -Math.PI / 2, -Math.PI, Math.PI / 2, Math.PI]

export const useDie = ({ impulse, position, rotation }: IDie) => {
  const [faceUp, setFaceUp] = useState<number | undefined>()
  const [isDieLanded, setIsDieLanded] = useState(false)
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position || [0, 0, 0],
    rotation: rotation || [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
  }))

  const positionRef = useRef([0, 0, 0])
  let prevPosition: React.MutableRefObject<number[]>
  let prevTime = 0

  // apply impulse at the begining of the die roll
  useEffect(() => {
    api.applyImpulse(impulse, [0, 0, 0])
    api.position.subscribe((pos) => (positionRef.current = pos || [0, 0, 0]))
  }, [])

  useFrame(({ clock }) => {
    // wait 4 sec for stops rolling 
    // TODO: think about checking previous positon without a lag
    if (clock.elapsedTime > 3 && !isDieLanded) {
      const face = whichFaceIsUp(ref.current?.rotation)
      setFaceUp(face)
      setIsDieLanded(true)
    }
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

    // TODO: refactor this to something shorter...
    switch (rotationZ) {
      case 0: // 0 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === 0) return 3
        if (rotationX === Math.PI || rotationX === -Math.PI) return 4
        if (rotationX === -Math.PI / 2) return 5
        break
      case -Math.PI / 2: // -90 deg
        if (Math.abs(rotationX) === Math.PI) return 1
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === -Math.PI / 2) return 5
        if (rotationX === 0) return 6
        break
      case Math.PI / 2: // 90 deg
        if (rotationX === 0) return 1
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === -Math.PI / 2) return 5
        if (Math.abs(rotationX) === Math.PI) return 6
        break
      case Math.PI: // 180 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === Math.PI || rotationX === -Math.PI) return 3
        if (rotationX === 0) return 4
        if (rotationX === -Math.PI / 2) return 5
        break
      case -Math.PI: // -180 deg
        if (rotationX === Math.PI / 2) return 2
        if (rotationX === Math.PI || rotationX === -Math.PI) return 3
        if (rotationX === 0) return 4
        if (rotationX === -Math.PI / 2) return 5
        break
      default:
        console.error(
          'Die was not recognized, default value for not recognized die is 3'
        )
    }
    return 3 // this should never happen, but just is case...
  }

  return { faceUp, isDieLanded, ref }
}
