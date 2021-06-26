import { Box } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import { useDie } from '_hooks/useDie'

interface IDie {
  castShadow?: boolean
  impulse: number[]
  player: 'player1' | 'player2'
  position: number[]
  rotation?: number[]
  updatePlayerPoints: (points: number, player: 'player1' | 'player2') => void
  updateRolledDiceCount: () => void
  walls: string[]
}

const SIDES = 6

const D6 = ({
  impulse,
  player,
  position,
  rotation,
  updatePlayerPoints,
  updateRolledDiceCount,
  walls,
}: IDie) => {
  const { ref, faceUp, isDieLanded } = useDie({
    impulse,
    position,
    rotation,
  })

  useEffect(() => {
    if (isDieLanded && faceUp) {
      updateRolledDiceCount()
      updatePlayerPoints(faceUp, player)
    }
  }, [isDieLanded])

  return (
    <Box args={[1, 1, 1]} ref={ref} castShadow receiveShadow>
      {[...Array(SIDES)].map((_, i) => {
        const texture = useLoader(THREE.TextureLoader, walls[i])
        return (
          <meshLambertMaterial attachArray="material" map={texture} key={i} />
        )
      })}
    </Box>
  )
}

export default D6
