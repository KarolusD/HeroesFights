import { motion } from 'framer-motion'
import React from 'react'
import styled, { css } from 'styled-components'
import { useHeroAnimation } from '_hooks/useHeroAnimation'
import { useHeroesContext } from '_hooks/useHeroesContext'
import DiceIndicators from '../DiceIndicators/DiceIndicator'
import HeroCard from './HeroCard/HeroCard'
import HeroPowerStats from './HeroPowerStats/HeroPowerStats'

interface Props {
  currentPowerStats: string
  dice?: boolean[]
  side: 'left' | 'right'
  isWinner: boolean
}

const Hero = ({ currentPowerStats, dice, side, isWinner }: Props) => {
  const { heroTransition, heroVariants } = useHeroAnimation(side)

  const {
    state: { player1, player2, isHeroesFighting, heroesFightState },
  } = useHeroesContext()

  const playerHero = side === 'left' ? player1 : player2

  const displayDiceBonus = () => {
    if (playerHero && playerHero.diceBonus && playerHero.diceBonus !== 0) {
      return `Dice bonus: ${playerHero.diceBonus}`
    }
  }

  const renderTextAboveHero = () => {
    let text: string | undefined

    if (isWinner && heroesFightState === 'WINNER SHOWN') {
      text = `${playerHero?.name} is a winner!`
    } else if (!isWinner && heroesFightState === 'WINNER SHOWN') {
      text = 'K.O'
    } else {
      text = displayDiceBonus()
    }

    return text && <TopHeroText>{text}</TopHeroText>
  }

  return (
    <>
      <HeroWinnerBackground isWinner={isWinner} side={side} />
      <HeroContainer
        animate={isHeroesFighting ? 'fighting' : 'default'}
        initial="default"
        transition={heroTransition}
        variants={heroVariants}
      >
        <HeroCardWinner isWinner={isWinner}>
          <HeroCard
            heroAlt={playerHero?.name}
            heroAppearance={playerHero?.appearance}
            heroBiography={playerHero?.biography}
            heroImage={playerHero?.images?.lg}
          />
          {isHeroesFighting && (
            <>
              {renderTextAboveHero()}
              {heroesFightState !== 'WINNER SHOWN' && (
                <DiceWrapper side={side}>
                  <DiceIndicators dice={dice} side={side} />
                </DiceWrapper>
              )}
              <HeroCurrentStats
                animate={
                  heroesFightState === 'START FIGHTING' ? 'visible' : 'hidden'
                }
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
        </HeroCardWinner>

        {playerHero && <HeroPowerStats playerHero={playerHero} side={side} />}
      </HeroContainer>
    </>
  )
}

export default Hero

const TopHeroText = styled.p`
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
  height: 100%;
`

const HeroCardWinner = styled.div<{
  isWinner: boolean
}>`
  transition: 600ms ease;
  transform: ${({ isWinner }) => (isWinner ? 'scale(1.6)' : 'scale(1)')};

  @media (max-width: 768px) {
    transform: ${({ isWinner }) => (isWinner ? 'scale(1.2)' : 'scale(1)')};
  }
`

const HeroWinnerBackground = styled.div<{
  side: 'left' | 'right'
  isWinner: boolean
}>`
  position: absolute;
  height: 100vh;
  width: 50vw;
  top: 0;
  left: ${({ side }) => (side === 'left' ? '0' : 'calc(100% - 50vw)')};
  z-index: 0;

  ${({ isWinner, side }) =>
    isWinner &&
    css`
      background: ${({ theme }) =>
        side === 'left'
          ? `linear-gradient(
        270deg,
        rgba(106, 157, 234, 0) 0%,
        rgba(106, 157, 234, 0.24) 100%)`
          : `linear-gradient(
        270deg,
        rgba(234, 106, 106, 0.24) 0%,
        rgba(234, 106, 106, 0.0) 100%)`};
    `}
`

const HeroCurrentStats = styled(motion.div)<{ side: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
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
