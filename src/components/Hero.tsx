import React from 'react'
import styled from 'styled-components'
import { IHero } from '../types/types'
import { HeroCard } from './HeroCard'
import HeroPowerStats from './HeroPowerStats'

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

interface Props {
  playerHero?: IHero
  side: 'left' | 'right'
}

const Hero: React.FC<Props> = ({ playerHero, side }) => {
  return (
    <HeroContainer>
      <HeroCard heroImage={playerHero?.images?.lg} />
      {playerHero && <HeroPowerStats playerHero={playerHero} side={side} />}
    </HeroContainer>
  )
}

export default Hero
