import React from 'react'
import styled, { css } from 'styled-components'
import unknowHero from '../../../assets/unknown.png'

interface Props {
  heroImage?: string
  heroAlt?: string
  heroAppearance?: any
  heroBiography?: any
}

const HeroCard = ({
  heroImage,
  heroAlt,
  heroAppearance,
  heroBiography,
}: Props) => {
  return (
    <HeroCardWrapper>
      <HeroImage alt={heroAlt} src={heroImage ? heroImage : unknowHero} />
      {heroImage && (
        <HeroHover>
          <HeroFullName>{heroBiography?.fullName}</HeroFullName>

          <HeroAppearance>
            <p>Gender</p>
            <p className="appearance">{heroAppearance?.gender ?? 'Unknown'}</p>
          </HeroAppearance>

          <HeroAppearance>
            <p>Race</p>
            <p className="appearance">{heroAppearance?.race ?? 'Unknown'}</p>
          </HeroAppearance>

          <HeroAppearance>
            <p>Height</p>
            <p className="appearance">
              {!heroAppearance.height[1] || heroAppearance.height[1] === '0 cm'
                ? 'Unknown'
                : heroAppearance.height[1]}
            </p>
          </HeroAppearance>
          <HeroAppearance>
            <p>Weight</p>
            <p className="appearance">
              {' '}
              {!heroAppearance.weight[1] || heroAppearance.weight[1] === '0 kg'
                ? 'Unknown'
                : heroAppearance.weight[1]}{' '}
            </p>
          </HeroAppearance>
          <HeroAppearance>
            <p>Alignment</p>
            <p className="appearance">
              {heroBiography?.alignment ?? 'Unknown'}
            </p>
          </HeroAppearance>

          <HeroPublisher>{heroBiography?.publisher}</HeroPublisher>
        </HeroHover>
      )}
    </HeroCardWrapper>
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

const HeroCardWrapper = styled.div`
  ${clipPath}
  height: 266px;
  position: relative;
  width: 200px;
`

const HeroImage = styled.img`
  height: 100%;
  width: 100%;
`

const HeroHover = styled.div`
  align-items: center;
  background: ${({ theme }) => `${theme.colors.background}CE`};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-flow: column nowrap;
  font-size: 0.9rem;
  height: 100%;
  padding: 8px 16px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 150ms ease;
  opacity: 0;

  ${HeroCardWrapper}:hover > & {
    opacity: 1;
  }
`

const HeroAppearance = styled.div`
  align-items: baseline;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 8px;
  width: 100%;

  & .appearance {
    font-weight: 600;
  }
`

const HeroFullName = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;

  margin-bottom: 8px;
`

const HeroPublisher = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  position: absolute;
  bottom: 8px;
  text-align: center;
`
