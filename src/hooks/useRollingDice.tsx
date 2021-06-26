import React, { useEffect, useState } from 'react'
import D6 from '_components/DiceScene/D6/D6'
import { blueWalls, redWalls } from '_components/DiceScene/diceWalls'
import { calculateDiceScore } from '_helpers/calculateDiceScore'
import { handleDieImpulse, handleDiePosition } from '_helpers/handleDie'
import { IHero, Players } from '_types/types'
import { useHeroesContext } from './useHeroesContext'

interface IRollingDice {
  player1DiceNumber: number
  player2DiceNumber: number
}

const useRollingDice = ({
  player1DiceNumber,
  player2DiceNumber,
}: IRollingDice) => {
  const [rolledDiceCount, setRolledDiceCount] = useState(0)

  const {
    dispatch,
    state: { heroesFightState },
  } = useHeroesContext()

  const updateRolledDiceCount = () => {
    setRolledDiceCount((count) => count + 1)
  }

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

  useEffect(() => {
    if (
      rolledDiceCount === player1DiceNumber + player2DiceNumber &&
      heroesFightState === 'ROLLING DICE'
    ) {
      dispatch({
        type: 'UPDATE_FIGHT_STATE',
        payload: {
          heroesFightState: 'SCORE READY',
        },
      })
    }
  }, [rolledDiceCount])

  return {
    updatePlayerPoints,
    updateRolledDiceCount,
  }
}

export default useRollingDice
