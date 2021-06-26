import React, { useEffect, useState } from 'react'
import { calculateDiceScore } from '_helpers/calculateDiceScore'
import { Players } from '_types/types'
import { useHeroesContext } from './useHeroesContext'

type Winner = null | 'player1' | 'player2' | 'tie'

export const useWinner = ({ player1, player2 }: Players) => {
  const [winner, setWinner] = useState<Winner>(null)
  const {
    dispatch,
    state: { heroesFightState },
  } = useHeroesContext()

  useEffect(() => {
    if (heroesFightState === 'SCORE READY' && player1 && player2) {
      const p1Score = calculateDiceScore(player1.dicePoints, player1.diceBonus)
      const p2Score = calculateDiceScore(player2.dicePoints, player2.diceBonus)
      let fightWinner: Winner = null

      if (p1Score > p2Score) fightWinner = 'player1'
      else if (p1Score < p2Score) fightWinner = 'player2'
      else fightWinner = 'tie'

      setTimeout(() => {
        setWinner(fightWinner)
        dispatch({
          type: 'UPDATE_FIGHT_STATE',
          payload: { heroesFightState: 'WINNER SHOWN' },
        })
      }, 3000)
    }
    if (heroesFightState === 'NOT READY') {
      setWinner(null)
    }
  }, [heroesFightState])

  return { winner }
}
