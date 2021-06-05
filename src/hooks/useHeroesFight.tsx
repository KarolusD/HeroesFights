import React, { useEffect, useState } from 'react'
import { calculateDiceBonus } from '_helpers/calculateDiceBonus'
import { IHero } from '_types/types'
import { useHeroesContext } from './useHeroesContext'
import { delay } from '_helpers/delay'

const DICE_NUMBER = 6

export const useHeroesFight = (player1?: IHero, player2?: IHero) => {
  const [currentPowerStats, setCurrentPowerStats] = useState('')
  const [roundWinner, setRoundWinner] = useState('')
  const [roundDiceBonus, setRoundDiceBonus] = useState(0)
  const [isRollingDice, setIsRollingDice] = useState(false)

  const {
    dispatch,
    state: { isHeroesFighting },
  } = useHeroesContext()

  useEffect(() => {
    async function fightUpdate() {
      if (
        player1 &&
        player2 &&
        isHeroesFighting &&
        player1.calculatedPowerStats &&
        player2.calculatedPowerStats
      ) {
        player1.diceCount = [...Array(DICE_NUMBER)].map(() => false)
        player2.diceCount = [...Array(DICE_NUMBER)].map(() => false)

        let player1DiceBonus = 0
        let player2DiceBonus = 0

        await delay(1000)

        for (const [idx, stats] of Object.keys(
          player1.calculatedPowerStats
        ).entries()) {
          setCurrentPowerStats(stats)

          await delay(500)

          const roundBonus = calculateDiceBonus(
            player1.calculatedPowerStats[stats],
            player2.calculatedPowerStats[stats]
          )
          setRoundDiceBonus(roundBonus)
          dispatch({
            type: 'UPDATE_ROUND_NUMBER',
            payload: { round: idx + 1 },
          })
          console.log('heeeere?')

          // setTimeout(() => {
          await delay(500)
          // updating dice indicator and setting round winner
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
            player2.diceCount[idx] = true

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
          // }, 1000)
          await delay(500)
          setRoundWinner('')
        }
        setIsRollingDice(true)
      }
    }

    fightUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHeroesFighting])

  return { currentPowerStats, roundWinner, roundDiceBonus, isRollingDice }
}
