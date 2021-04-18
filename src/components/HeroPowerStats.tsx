import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import HeroStatsBorderLeft from '../assets/HeroStatsBorderLeft'
import HeroStatsBorderRight from '../assets/HeroStatsBorderRight'
import { IHero, IPowerStats } from '../types/types'
import PreparationButton from './PreparationButton'

type PreparationT = 'unprepared' | 'prepared' | 'fully-prepared'

const PREPARATION_NAMES: PreparationT[] = [
  'unprepared',
  'prepared',
  'fully-prepared',
]

const Bonus = styled.span<{ isPositive?: boolean }>`
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.colors.success : theme.colors.error};
  font-size: 12px;
  margin-left: 4px;
`

const ButtonsContainer = styled.div`
  bottom: -20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 20px;
  position: absolute;
  width: 160px;
`

const HeroStats = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 286px;
  margin-top: 28px;
  min-width: 200px;
  padding: 16px;
  position: relative;

  & .border {
    position: absolute;
    top: 0;
    height: 100%;
  }

  & .border-left {
    left: 0;
  }

  & .border-right {
    right: 0;
  }
`

const HeroName = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  line-height: 22px;
  margin-bottom: 16px;
  margin-top: -28px;
  max-width: 160px;
  text-align: center;
  width: 100%;
`

const PowerStats = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;

  & > .stats {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 400;
    text-transform: capitalize;
  }

  & > .value {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`

const calculateBonus = (currStats: number, defaultStats: number) => {
  return parseFloat(((-1 + currStats / defaultStats) * 100).toFixed(1))
}

const displayBonus = (bonus: number, key: string) => {
  if (bonus < 0) {
    return <Bonus key={key}>{`${bonus}%`}</Bonus>
  } else if (bonus > 0) {
    return <Bonus key={key} isPositive>{`+${bonus}%`}</Bonus>
  }

  return null
}

interface Props {
  playerHero?: IHero
  side: 'left' | 'right'
}

const HeroPowerStats = ({ playerHero, side }: Props) => {
  const [preparation, setPreparation] = useState<PreparationT>('prepared')
  const [heroStats, setHeroStats] = useState<IPowerStats>()
  const [heroBonus, setHeroBonus] = useState<IPowerStats>()

  const theme = useContext(ThemeContext)

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
            acc[key] = value > 100 ? 100 : parseFloat(value.toFixed(1))
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

  return (
    <HeroStats>
      <HeroName>{playerHero && playerHero?.name}</HeroName>
      <HeroStatsBorderLeft
        className="border border-left"
        fill={side === 'left' ? theme.colors.blue : theme.colors.red}
      />
      <HeroStatsBorderRight
        className="border border-right"
        fill={side === 'left' ? theme.colors.blue : theme.colors.red}
      />
      {playerHero &&
        heroStats &&
        Object.keys(heroStats).map((key: string, i) => {
          return (
            <PowerStats key={key}>
              <h3 className="stats">
                {key}
                {preparation !== 'prepared' &&
                  heroBonus &&
                  displayBonus(heroBonus[key], key)}
              </h3>
              <h3 className="value">{heroStats[key]}</h3>
            </PowerStats>
          )
        })}
      <ButtonsContainer>
        {PREPARATION_NAMES.map((prep) => (
          <PreparationButton
            onClick={() => setPreparation(prep)}
            selected={preparation === prep}
            preparation={prep}
            side={side}
          />
        ))}
      </ButtonsContainer>
    </HeroStats>
  )
}

export default HeroPowerStats
