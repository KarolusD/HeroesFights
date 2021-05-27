import { useEffect, useState } from 'react'
import { calculateBonus } from '../helpers/calculateBonus'
import { IHero, IPowerStats, PreparationT } from '../types/types'
import { useHerosContext } from './useHerosContext'

export const usePowerStats = (
  preparation: PreparationT,
  side: 'left' | 'right',
  playerHero?: IHero,
  initialState?: IPowerStats
) => {
  const { dispatch } = useHerosContext()
  const [heroStats, setHeroStats] =
    useState<IPowerStats | undefined>(initialState)
  const [heroBonus, setHeroBonus] =
    useState<IPowerStats | undefined>(initialState)

  useEffect(() => {
    if (playerHero) {
      const { powerstats } = playerHero
      let calculatedPowerStats: IPowerStats | undefined

      if (preparation === 'unprepared') {
        calculatedPowerStats = Object.keys(powerstats).reduce(
          (acc: any, key: string) => {
            let value =
              powerstats[key] -
              (100 - powerstats.strength) / 10 -
              (100 - powerstats.power) / 10 -
              (100 - powerstats.combat) / 10

            acc[key] = value < 0 ? 0 : parseFloat(value.toFixed(2))
            return acc
          },
          {}
        )
      } else if (preparation === 'prepared') {
        calculatedPowerStats = powerstats
      } else if (preparation === 'fully-prepared') {
        calculatedPowerStats = Object.keys(powerstats).reduce(
          (acc: any, key: string) => {
            let value =
              powerstats[key] +
              powerstats.intelligence / 10 +
              powerstats.speed / 10 +
              powerstats.combat / 10
            acc[key] = parseFloat(value.toFixed(1))
            return acc
          },
          {}
        )
      }
      if (calculatedPowerStats) {
        const bonus = Object.keys(calculatedPowerStats).reduce(
          (acc: any, key: string) => {
            let value =
              calculatedPowerStats &&
              calculateBonus(calculatedPowerStats[key], powerstats[key])

            acc[key] = value
            return acc
          },
          {}
        )
        setHeroBonus(bonus)
      }
      setHeroStats(calculatedPowerStats)
      dispatch({
        type: 'SAVE_CALCULATED_POWERSTATS',
        payload: {
          player: side === 'left' ? 'player1' : 'player2',
          preparation,
          calculatedPowerStats,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHero?.id, preparation])

  return { heroStats, heroBonus }
}
