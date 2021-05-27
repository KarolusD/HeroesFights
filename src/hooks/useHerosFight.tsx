import React, { useEffect, useState } from 'react'
import { IHero } from '../types/types'
import { useHerosContext } from './useHerosContext'

const DICE_NUMBER = 6

export const useHerosFight = (player1?: IHero, player2?: IHero) => {
  const [currentPowerStats, setCurrentPowerStats] = useState('')
  const [roundWinner, setRoundWinner] = useState('')

  const {
    dispatch,
    state: { isHerosFighting },
  } = useHerosContext()

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

      Object.keys(player1.calculatedPowerStats).forEach((stats, idx) => {
        setTimeout(() => {
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
              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player1',
                  diceCount: player1.diceCount,
                },
              })
            } else if (
              player1.calculatedPowerStats[stats] <
              player2.calculatedPowerStats[stats]
            ) {
              setRoundWinner('player2')
              player2.diceCount[idx] = true
              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player2',
                  diceCount: player2.diceCount,
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
                },
              })
              dispatch({
                type: 'UPDATE_DICE_COUNT',
                payload: {
                  player: 'player2',
                  diceCount: player2.diceCount,
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

  return { currentPowerStats, roundWinner }
}
