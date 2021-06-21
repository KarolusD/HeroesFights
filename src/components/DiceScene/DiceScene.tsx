import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { randomNumber } from '_helpers/randomNumber'
import { useDimensions } from '_hooks/useDimensions'
import { useHeroesContext } from '_hooks/useHeroesContext'
import D6 from './D6/D6'
import { blueWalls, redWalls } from './diceWalls'
import Wall from './Wall/Wall'

interface DiceSceneProps {
  player1DiceNumber?: number
  player2DiceNumber?: number
  diceLandedCount: number
  setIsScoreReady: Dispatch<SetStateAction<boolean>>
  updateDice: (faceUp: number) => void
}

const DiceScene = ({
  player1DiceNumber,
  player2DiceNumber,
  diceLandedCount,
  setIsScoreReady,
  updateDice,
}: DiceSceneProps) => {
  const { dispatch } = useHeroesContext()

  const handleDiePosition = (player: 'player1' | 'player2') => {
    const posX = player === 'player1' ? -10 : 10 // how far dice are on left/right
    const posY = randomNumber(3, 8) // how high the dice are
    const posZ = randomNumber(-5, 5) // how spread out the dice are

    return [posX, posY, posZ]
  }

  const handleDieImpulse = (player: 'player1' | 'player2') => {
    const impX =
      player === 'player1' ? randomNumber(15, 25) : randomNumber(-25, -15) // how strong are the dice rolled (left/right)
    const impY = 0
    const impZ = randomNumber(-2, 2) // direction of the roll (up/down)

    return [impX, impY, impZ]
  }

  useEffect(() => {
    let p1DiceNum = player1DiceNumber ? player1DiceNumber : 0
    let p2DiceNum = player2DiceNumber ? player2DiceNumber : 0
    if (diceLandedCount === p1DiceNum + p2DiceNum) {
      setIsScoreReady(true)
      console.log('score is ready')
    }
  }, [diceLandedCount])

  const { windowWidth, windowHeight } = useDimensions()

  const updatePlayerPoints = (
    points: number,
    player: 'player1' | 'player2'
  ) => {
    dispatch({
      type: 'ADD_HERO_POINTS',
      payload: {
        points,
        player,
      },
    })
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
          args={[1000, 10]}
          // color="yellow"
          position={[-windowWidth / 2 / 75, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Wall
          args={[1000, 10]}
          // color="red"
          position={[windowWidth / 2 / 75, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Wall
          args={[10, 1000]}
          // color="blue"
          position={[0, 0, -windowHeight / 2 / 75]}
          rotation={[0, 0, Math.PI / 2]}
        />

        <Wall
          args={[1000, 10]}
          // color="green"
          position={[0, 0, windowHeight / 2 / 75]}
          rotation={[0, Math.PI, 0]}
        />

        {[...Array(player1DiceNumber)].map((_, i) => {
          let dieImpulse = handleDieImpulse('player1')
          let diePosition = handleDiePosition('player1')
          return (
            <D6
              walls={blueWalls}
              impulse={dieImpulse}
              position={diePosition}
              player="player1"
              updatePlayerPoints={updatePlayerPoints}
              updateDice={updateDice}
              key={i + 'player1'}
            />
          )
        })}

        {[...Array(player2DiceNumber)].map((_, i) => {
          let dieImpulse = handleDieImpulse('player2')
          let diePosition = handleDiePosition('player2')
          return (
            <D6
              walls={redWalls}
              impulse={dieImpulse}
              position={diePosition}
              player="player2"
              updatePlayerPoints={updatePlayerPoints}
              updateDice={updateDice}
              key={i + 'player2'}
            />
          )
        })}
      </Physics>
    </Canvas>
  )
}

export default DiceScene
