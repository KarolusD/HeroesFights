import React, { useEffect, useState } from 'react'
import { IHero } from '../types/types'
import { useHerosContext } from './useHerosContext'

const DICE_NUMBER = 6

export const useHerosFight = (player1?: IHero, player2?: IHero) => {
  const [currentPowerStats, setCurrentPowerStats] = useState('')
  const [roundWinner, setRoundWinner] = useState('')

  const [player1Dices, setPlayer1Dices] = useState(
    [...Array(DICE_NUMBER)].map(() => false)
  )
  const [player2Dices, setPlayer2Dices] = useState(
    [...Array(DICE_NUMBER)].map(() => false)
  )
  const {
    state: { isHerosFighting },
  } = useHerosContext()

  // const handleDiceUpdate = (
  //   playerDices: boolean[],
  //   statsIdx: number,
  //   players: { winner: IHero; losser: IHero }
  // ) => {
  //   const { winner, losser } = players

  //   if (winner && losser) {
  //     return playerDices.map((_, diceIdx) => {
  //       if (statsIdx < diceIdx) return false
  //       if (
  //         Object.values(winner.powerstats)[diceIdx] >=
  //         Object.values(losser.powerstats)[diceIdx]
  //       ) {
  //         return true
  //       }
  //       return false
  //     })
  //   }
  //   return []
  // }

  // const handleDices = (stats: string, statsIdx: number) => {
  //   if (player1 && player2) {
  //     if (
  //       player1.calculatedPowerStats[stats] >
  //       player2.calculatedPowerStats[stats]
  //     ) {
  //       setRoundWinner('player1')
  //       setPlayer1Dices((prevState) =>
  //         handleDiceUpdate(prevState, statsIdx, {
  //           winner: player1,
  //           losser: player2,
  //         })
  //       )
  //     } else if (
  //       player1.calculatedPowerStats[stats] <
  //       player2.calculatedPowerStats[stats]
  //     ) {
  //       setRoundWinner('player2')
  //       setPlayer2Dices((prevState) =>
  //         handleDiceUpdate(prevState, statsIdx, {
  //           winner: player2,
  //           losser: player1,
  //         })
  //       )
  //     } else {
  //       setRoundWinner('tie')
  //       setPlayer1Dices((prevState) =>
  //         handleDiceUpdate(prevState, statsIdx, {
  //           winner: player1,
  //           losser: player2,
  //         })
  //       )
  //       setPlayer2Dices((prevState) =>
  //         handleDiceUpdate(prevState, statsIdx, {
  //           winner: player2,
  //           losser: player1,
  //         })
  //       )
  //     }
  //   }
  // }

  useEffect(() => {
    console.log(player1, player2)
    if (
      player1 &&
      player2 &&
      isHerosFighting &&
      player1.calculatedPowerStats &&
      player2.calculatedPowerStats
    ) {
      setCurrentPowerStats('intelligence')
      Object.keys(player1.calculatedPowerStats).forEach((stats, idx) => {
        setTimeout(() => {
          setCurrentPowerStats(stats)
          setTimeout(() => {
            //handleDices(stats, idx)
          }, 1000)
        }, (idx + 1) * 1500)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHerosFighting])

  return { player1Dices, player2Dices, currentPowerStats, roundWinner }
}
