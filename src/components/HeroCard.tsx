import React from 'react'
import styled, { css } from 'styled-components'
import unknowHero from '../assets/unknown.png'

const clipPath = css`
  clip-path: polygon(
    5% 0,
    95% 0,
    100% 5%,
    100% 95%,
    95% 100%,
    5% 100%,
    0 95%,
    0 5%
  );
`

const StyledHeroCard = styled.div`
  ${clipPath}
  height: 266px;
  width: 200px;
`

const StyledHeroImage = styled.img`
  height: 100%;
  width: 100%;
`

interface Props {
  heroImage?: string
}

export const HeroCard = ({ heroImage }: Props) => {
  return (
    <StyledHeroCard>
      <StyledHeroImage src={heroImage ? heroImage : unknowHero} />
    </StyledHeroCard>
  )
}
