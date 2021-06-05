import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import HeroStatsBorderLeft from '_assets/HeroStatsBorderLeft'
import HeroStatsBorderRight from '_assets/HeroStatsBorderRight'
import { useHeroesContext } from '_hooks/useHeroesContext'
import { usePowerStats } from '_hooks/usePowerStats'
import { IHero, PreparationT } from '_types/types'
import PreparationButton from './PreparationButton'

const PREPARATION_NAMES: PreparationT[] = [
  'unprepared',
  'prepared',
  'fully-prepared',
]

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
  const { heroStats, heroBonus } = usePowerStats(
    preparation,
    side,
    playerHero,
    playerHero?.powerstats
  )

  const theme = useContext(ThemeContext)

  const {
    state: { isHeroesFighting },
  } = useHeroesContext()

  const heroStatsVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  const heroStatsTransition = {
    type: 'ease',
    duration: 0.2,
  }

  return (
    <HeroStats
      animate={isHeroesFighting ? 'hidden' : 'visible'}
      initial={isHeroesFighting ? 'hidden' : 'visible'}
      transition={heroStatsTransition}
      variants={heroStatsVariants}
    >
      <HeroName>{playerHero && playerHero?.name}</HeroName>
      <HeroStatsBorderLeft
        className="border border-left"
        fill={side === 'left' ? theme.colors.blue : theme.colors.red}
      />
      <HeroStatsBorderRight
        className="border border-right"
        fill={side === 'left' ? theme.colors.blue : theme.colors.red}
      />
      {heroStats &&
        Object.keys(heroStats).map((key: string) => {
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
        {PREPARATION_NAMES.map((prep, idx) => (
          <PreparationButton
            onClick={() => setPreparation(prep)}
            key={idx}
            isSelected={preparation === prep}
            preparation={prep}
            side={side}
          />
        ))}
      </ButtonsContainer>
    </HeroStats>
  )
}

export default HeroPowerStats

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

const HeroStats = styled(motion.div)`
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
  font-weight: 500;
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
    font-weight: 300;
    text-transform: capitalize;
  }

  & > .value {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`
