import { Physics, usePlane } from '@react-three/cannon'
import { Plane } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { randomNumber } from '_helpers/randomNumber'
import D6 from './D6/D6'
import { blueWalls, redWalls } from './diceWalls'

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

interface DiceSceneProps {
  player?: 'player1' | 'player2'
  diceNumber: number
}

const DiceScene = ({ diceNumber, player }: DiceSceneProps) => {
  const theme = useContext(ThemeContext)

  const dieWalls = player === 'player1' ? blueWalls : redWalls

  const handleDiePosition = () => {
    const posX = player === 'player1' ? -10 : 10 // how far dice are on left/right
    const posY = randomNumber(5, 10) // how high the dice are
    const posZ = randomNumber(-5, 5) // how spread out the dice are

    return [posX, posY, posZ]
  }

  const handleDieImpulse = () => {
    const impX =
      player === 'player1' ? randomNumber(10, 25) : randomNumber(-25, -10) // how strong are the dice rolled (left/right)
    const impY = 0
    const impZ = randomNumber(-1, 1) // direction of the roll (up/down)

    return [impX, impY, impZ]
  }

  return (
    <Canvas shadows camera={{ position: [0, 20, 0], fov: 50 }}>
      <ambientLight intensity={1} />
      <spotLight
        angle={0.2}
        position={[0, 150, -75]}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <Physics gravity={[0, -30, 0]}>
        <Wall floor />
        <Wall
          args={[1000, 1]}
          color={theme.colors.blue}
          position={[-window.innerWidth / 2 / 75, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Wall
          args={[1000, 1]}
          color={theme.colors.background}
          position={[window.innerWidth / 2 / 75, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Wall
          args={[1, 1000]}
          position={[0, 0, -window.innerHeight / 2 / 75]}
          rotation={[0, 0, Math.PI / 2]}
        />

        <Wall
          args={[1000, 1]}
          position={[0, 0, window.innerHeight / 2 / 75]}
          rotation={[0, Math.PI, 0]}
        />
        {[...Array(diceNumber)].map(() => {
          let dieImpulse = handleDieImpulse()
          let diePosition = handleDiePosition()
          return (
            <D6 walls={dieWalls} impulse={dieImpulse} position={diePosition} />
          )
        })}
      </Physics>
    </Canvas>
  )
}

export default DiceScene
