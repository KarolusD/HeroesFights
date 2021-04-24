import React, { useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components'
import unknowHero from '../../../assets/unknown.png'

interface Props {
  heroImage?: string
  heroAlt?: string
}

const HeroCard = ({ heroImage, heroAlt }: Props) => {
  return (
    <StyledHeroCard>
      <StyledHeroImage
        alt={heroAlt}
        height={266}
        src={heroImage ? heroImage : unknowHero}
        width={200}
      />
    </StyledHeroCard>
  )
}

export default HeroCard

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
