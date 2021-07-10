import React, { useEffect, useState } from 'react'
import { useHeroesContext } from '_hooks/useHeroesContext'
import { roundNum } from '_helpers/roundNum'

export const usePlayerChances = (player: 'player1' | 'player2') => {
  const [playerChances, setPlayerChances] = useState<number>(0.5)

  const { state: {
    player1, player2, isHeroesFighting
  } } = useHeroesContext()

  const playerHero = player === 'player1' ? player1 : player2
  const opponentHero = player === 'player1' ? player2 : player1

  const playerHeroDice = playerHero?.diceCount.filter(dice => dice).length || 0
  const opponentHeroDice = opponentHero?.diceCount.filter(dice => dice).length || 0

  useEffect(() => {
      let total = (playerHeroDice + opponentHeroDice)
      if (total === 0) total = 1
      const chances = roundNum(playerHeroDice / total, 2)
      
      setPlayerChances(chances)
  }, [playerHeroDice, opponentHeroDice])

  useEffect(() => {
    if (!isHeroesFighting) {
      setPlayerChances(0.5)
    }
  }, [isHeroesFighting])

  return { playerChances }
}
