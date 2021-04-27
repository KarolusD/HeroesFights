import React from 'react'
import styled from 'styled-components'
import { useHerosContext } from '../../hooks/useHerosContext'
import HeroCard from './HeroCard/HeroCard'
import HeroPowerStats from './HeroPowerStats/HeroPowerStats'

interface Props {
  side: 'left' | 'right'
}

const Hero = ({ side }: Props) => {
  const {
    state: { player1, player2 },
  } = useHerosContext()

  const playerHero = side === 'left' ? player1 : player2

  return (
    <HeroContainer>
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

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
