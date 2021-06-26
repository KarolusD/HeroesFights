import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { handleDieImpulse, handleDiePosition } from '_helpers/handleDie'
import { useDimensions } from '_hooks/useDimensions'
import { useHeroesContext } from '_hooks/useHeroesContext'
import useRollingDice from '_hooks/useRollingDice'
import D6 from './D6/D6'
import {
  blueWalls,
  redWalls,
  specialBlueWalls,
  specialRedWalls,
} from './diceWalls'
import Wall from './Wall/Wall'

const SPECIAL_DICE_NUMBER = 3

const DiceScene = () => {
  const { windowWidth, windowHeight } = useDimensions()
  const {
    state: { player1, player2 },
  } = useHeroesContext()

  // diceCount is an array of taken dice represented with a booleans [false, true, ...]
  let player1DiceNumber = player1?.diceCount?.filter((d) => d).length || 0
  let player2DiceNumber = player2?.diceCount?.filter((d) => d).length || 0

  player1DiceNumber += SPECIAL_DICE_NUMBER
  player2DiceNumber += SPECIAL_DICE_NUMBER

  const { updateRolledDiceCount, updatePlayerPoints } = useRollingDice({
    player1DiceNumber,
    player2DiceNumber,
  })

  const renderDice = (player: 'player1' | 'player2') => {
    const playerDiceNumber =
      player === 'player1' ? player1DiceNumber : player2DiceNumber
    const dieWalls = player === 'player1' ? blueWalls : redWalls
    const specialDieWalls =
      player === 'player1' ? specialBlueWalls : specialRedWalls

    return [...Array(playerDiceNumber)].map((_, i) => {
      let dieImpulse = handleDieImpulse(player)
      let diePosition = handleDiePosition(player)

      return (
        <D6
          walls={i > 2 ? dieWalls : specialDieWalls}
          impulse={dieImpulse}
          position={diePosition}
          player={player}
          updatePlayerPoints={updatePlayerPoints}
          updateRolledDiceCount={updateRolledDiceCount}
          key={i + player}
        />
      )
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
        {renderDice('player1')}
        {renderDice('player2')}
      </Physics>
    </Canvas>
  )
}

export default DiceScene
