import { useEffect, useState } from 'react'
import { calculateBonus } from '../helpers/calculateBonus'
import { IHero, IPowerStats } from '../types/types'

export const usePowerStats = (
  preparation: 'unprepared' | 'prepared' | 'fully-prepared',
  playerHero?: IHero,
  initialState?: IPowerStats
) => {
  const [heroStats, setHeroStats] = useState<IPowerStats | undefined>(
    initialState
  )
  const [heroBonus, setHeroBonus] = useState<IPowerStats | undefined>(
    initialState
  )

  useEffect(() => {
    if (playerHero) {
      const { powerstats } = playerHero
      let calculatedStats: IPowerStats | undefined

      if (preparation === 'unprepared') {
        calculatedStats = Object.keys(powerstats).reduce(
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
        calculatedStats = powerstats
      } else if (preparation === 'fully-prepared') {
        calculatedStats = Object.keys(powerstats).reduce(
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
      if (calculatedStats) {
        const bonus = Object.keys(calculatedStats).reduce(
          (acc: any, key: string) => {
            let value =
              calculatedStats &&
              calculateBonus(calculatedStats[key], powerstats[key])

            acc[key] = value
            return acc
          },
          {}
        )
        setHeroBonus(bonus)
      }
      setHeroStats(calculatedStats)
    }
  }, [playerHero, preparation])

  return { heroStats, heroBonus }
}
