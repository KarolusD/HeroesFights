import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useHeroAnimation } from '../../hooks/useHeroAnimation'
import { useHerosContext } from '../../hooks/useHerosContext'
import DiceIndicators from '../DiceIndicators/DiceIndicator'
import HeroCard from './HeroCard/HeroCard'
import HeroPowerStats from './HeroPowerStats/HeroPowerStats'

interface Props {
  currentPowerStats: string
  dice?: boolean[]
  side: 'left' | 'right'
}

const Hero = ({ currentPowerStats, dice, side }: Props) => {
  const { heroTransition, heroVariants } = useHeroAnimation(side)

  const {
    state: { player1, player2, isHerosFighting },
  } = useHerosContext()

  const playerHero = side === 'left' ? player1 : player2

  const currentStatsVarinats = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  }

  return (
    <HeroContainer
      animate={isHerosFighting ? 'fighting' : 'default'}
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
      {isHerosFighting && (
        <>
          <DiceWrapper side={side}>
            <DiceIndicators dice={dice} side={side} />
          </DiceWrapper>
          <HeroCurrentStats
            animate="visible"
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
  )
}

export default Hero

const HeroContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
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
