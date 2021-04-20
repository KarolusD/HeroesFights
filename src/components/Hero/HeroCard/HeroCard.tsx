import React from 'react'
import styled, { css } from 'styled-components'
import unknowHero from '../../../assets/unknown.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props {
  heroImage?: string
  heroAlt?: string
}

const HeroCard = ({ heroImage, heroAlt }: Props) => {
  return (
    <StyledHeroCard>
      <StyledHeroImage
        alt={heroAlt}
        effect="blur"
        src={heroImage ? heroImage : unknowHero}
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

const StyledHeroImage = styled(LazyLoadImage)`
  height: 100%;
  width: 100%;
`
