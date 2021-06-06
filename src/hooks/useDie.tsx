import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'

interface IDie {
  impulse: number[]
  position: number[]
  rotation?: number[]
}

const POSSIBLE_ROTATIONS = [0, -Math.PI / 2, -Math.PI, Math.PI / 2, Math.PI]

export const useDie = ({ impulse, position, rotation }: IDie) => {
  const [faceUp, setFaceUp] = useState<number | undefined>()
  const [dieLanded, setDieLanded] = useState(false)
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position,
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
    api.position.subscribe((pos) => (positionRef.current = pos))
  }, [])

  useFrame(({ clock }) => {
    // wait 3 sec to update position
    if (prevTime + 3 < clock.elapsedTime) {
      prevTime = clock.elapsedTime
      prevPosition = positionRef
    }

    // if die stops rolling check which face is up
    if (
      !dieLanded &&
      prevPosition &&
      prevPosition.current[0] === positionRef.current[0] &&
      prevPosition.current[1] === positionRef.current[1] &&
      prevPosition.current[2] === positionRef.current[2]
    ) {
      const face = whichFaceIsUp(positionRef.current)
      setFaceUp(face)
      setDieLanded(true)
      console.log(face, '<--- face')
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

  const whichFaceIsUp = (rotation: number[]) => {
    const rotationX = closestToPossibleRotation(rotation[0])
    const rotationZ = closestToPossibleRotation(rotation[2])

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
        return 3 // this should never happen, but just is case...
    }
  }

  return { faceUp, ref }
}
