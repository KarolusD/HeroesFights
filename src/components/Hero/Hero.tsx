import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import DiceScene from '_components/DiceScene/DiceScene'
import { useHeroAnimation } from '_hooks/useHeroAnimation'
import { useHeroesContext } from '_hooks/useHeroesContext'
import DiceIndicators from '../DiceIndicators/DiceIndicator'
import HeroCard from './HeroCard/HeroCard'
import HeroPowerStats from './HeroPowerStats/HeroPowerStats'

interface Props {
  currentPowerStats: string
  dice?: boolean[]
  isRollingDiceReady: boolean
  side: 'left' | 'right'
}

const Hero = ({ currentPowerStats, isRollingDiceReady, dice, side }: Props) => {
  const { heroTransition, heroVariants } = useHeroAnimation(side)

  const {
    state: { player1, player2, isHeroesFighting },
  } = useHeroesContext()

  const playerHero = side === 'left' ? player1 : player2
  const player = side === 'left' ? 'player1' : 'player2'

  const displayDiceBonus = () => {
    if (playerHero && playerHero.diceBonus && playerHero.diceBonus !== 0) {
      return `Dice bonus: ${playerHero.diceBonus}`
    }
  }

  return (
    <>
      <HeroContainer
        animate={isHeroesFighting ? 'fighting' : 'default'}
        initial="default"
        transition={heroTransition}
        variants={heroVariants}
      >
        <HeroCard
          heroAlt={playerHero?.name}
          heroAppearance={playerHero?.appearance}
          heroBiography={playerHero?.biography}
          heroImage={playerHero?.images?.lg}
        />
        {isHeroesFighting && (
          <>
            <BonusText>{displayDiceBonus()}</BonusText>
            <DiceWrapper side={side}>
              <DiceIndicators dice={dice} side={side} />
            </DiceWrapper>
            <HeroCurrentStats
              animate={isRollingDiceReady ? 'hidden' : 'visible'}
              initial="hidden"
              variants={currentStatsVarinats}
              transition={{ duration: 0.2, delay: 1 }}
              side={side}
            >
              <h3>{currentPowerStats}</h3>
              <h2>{playerHero?.calculatedPowerStats[currentPowerStats]}</h2>
            </HeroCurrentStats>
          </>
        )}

        {playerHero && <HeroPowerStats playerHero={playerHero} side={side} />}
      </HeroContainer>
    </>
  )
}

export default Hero

const BonusText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`

const DiceWrapper = styled.div<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 0;

  ${({ side }) =>
    side === 'left'
      ? css`
          left: -16px;
        `
      : css`
          right: -16px;
        `}
`

const HeroContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`

const HeroCurrentStats = styled(motion.div)<{ side: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 8%;
  min-width: 300px;

  & > h2,
  h3 {
    color: ${({ theme }) => theme.colors.text};
  }

  & > h2 {
    font-size: 4rem;
    font-weight: 500;
  }

  & > h3 {
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 300;
  }

  ${({ side }) =>
    side === 'left'
      ? css`
          align-items: flex-start;
          right: 0;
          transform: translateX(120%);
        `
      : css`
          align-items: flex-end;
          right: 0;
          left: 0;
          transform: translateX(-120%);
        `}
`

const currentStatsVarinats = {
  visible: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
}
