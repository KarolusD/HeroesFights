import React, { useEffect, useState } from 'react'
import { calculateDiceBonus } from '_helpers/calculateDiceBonus'
import { IHero } from '_types/types'
import { useHeroesContext } from './useHeroesContext'

const DICE_NUMBER = 6

export const useHeroesFight = (player1?: IHero, player2?: IHero) => {
  const [currentPowerStats, setCurrentPowerStats] = useState('')
  const [roundWinner, setRoundWinner] = useState('')
  const [roundDiceBonus, setRoundDiceBonus] = useState(0)

  const {
    dispatch,
    state: { isHerosFighting },
  } = useHeroesContext()

  useEffect(() => {
    if (
      player1 &&
      player2 &&
      isHerosFighting &&
      player1.calculatedPowerStats &&
      player2.calculatedPowerStats
    ) {
      // setting starting fight data
      setCurrentPowerStats('intelligence')
      player1.diceCount = [...Array(DICE_NUMBER)].map(() => false)
      player2.diceCount = [...Array(DICE_NUMBER)].map(() => false)

      let player1DiceBonus = 0
      let player2DiceBonus = 0

      Object.keys(player1.calculatedPowerStats).forEach((stats, idx) => {
        setTimeout(() => {
          const roundBonus = calculateDiceBonus(
            player1.calculatedPowerStats[stats],
            player2.calculatedPowerStats[stats]
          )
          setRoundDiceBonus(roundBonus)
          setCurrentPowerStats(stats)

          dispatch({
            type: 'UPDATE_ROUND_NUMBER',
            payload: { round: idx + 1 },
          })

          setTimeout(() => {
            if (
              player1.calculatedPowerStats[stats] >
              player2.calculatedPowerStats[stats]
            ) {
              setRoundWinner('player1')
              player1.diceCount[idx] = true
              player1DiceBonus += roundBonus

              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player1',
                  diceCount: player1.diceCount,
                  diceBonus: player1DiceBonus,
                },
              })
            } else if (
              player1.calculatedPowerStats[stats] <
              player2.calculatedPowerStats[stats]
            ) {
              setRoundWinner('player2')
              player2.diceCount[idx] = true
              player2DiceBonus += roundBonus

              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player2',
                  diceCount: player2.diceCount,
                  diceBonus: player2DiceBonus,
                },
              })
            } else {
              setRoundWinner('tie')
              player1.diceCount[idx] = true

              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player1',
                  diceCount: player1.diceCount,
                  diceBonus: player1DiceBonus,
                },
              })

              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player2',
                  diceCount: player2.diceCount,
                  diceBonus: player2DiceBonus,
                },
              })
            }
          }, 1000)

          setRoundWinner('')
        }, (idx + 1) * 2000)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHerosFighting])

  return { currentPowerStats, roundWinner, roundDiceBonus }
}
