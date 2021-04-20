import React from 'react'
import styled from 'styled-components'
import { IHero } from '../../types/types'
import HeroCard from './HeroCard/HeroCard'
import HeroPowerStats from './HeroPowerStats/HeroPowerStats'

interface Props {
  playerHero?: IHero
  side: 'left' | 'right'
}

const Hero = ({ playerHero, side }: Props) => {
  return (
    <HeroContainer>
      <HeroCard heroAlt={playerHero?.name} heroImage={playerHero?.images?.lg} />
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
