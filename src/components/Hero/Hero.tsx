import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { useHeroAnimation } from '../../hooks/useHeroAnimation'
import { useHerosContext } from '../../hooks/useHerosContext'
import HeroCard from './HeroCard/HeroCard'
import HeroPowerStats from './HeroPowerStats/HeroPowerStats'

interface Props {
  side: 'left' | 'right'
}

const Hero = ({ side }: Props) => {
  const { heroTransition, heroVariants } = useHeroAnimation(side)

  const {
    state: { player1, player2, isHerosFighting },
  } = useHerosContext()

  const playerHero = side === 'left' ? player1 : player2

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
