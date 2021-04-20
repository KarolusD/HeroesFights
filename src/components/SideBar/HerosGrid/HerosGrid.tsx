import React, { Dispatch } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { IHero } from '../../../types/types'
import styled, { css } from 'styled-components'
import {
  LazyLoadImage,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props {
  filteredHeros?: IHero[]
  playerHero?: IHero
  setPlayerHero: Dispatch<IHero>
  scrollPosition: ScrollPosition
  side: 'left' | 'right'
}

const HerosGrid = ({
  filteredHeros,
  playerHero,
  setPlayerHero,
  side,
  scrollPosition,
}: Props) => {
  return (
    <StyledGrid>
      {filteredHeros &&
        filteredHeros.map((hero) => (
          <Hero
            isSelected={playerHero && hero.id === playerHero.id}
            key={hero.id}
            onClick={() => setPlayerHero(hero)}
            side={side}
          >
            <HeroImg
              alt={hero?.name}
              effect="blur"
              scrollPosition={scrollPosition}
              src={hero.images?.sm}
            />
            {playerHero && hero.id === playerHero.id && (
              <CheckOutlined className="check" />
            )}
            <HeroName className="name">{hero?.name}</HeroName>
          </Hero>
        ))}
    </StyledGrid>
  )
}

export default trackWindowScroll(HerosGrid)

const clipPath = css`
  clip-path: polygon(
    10% 0,
    90% 0,
    100% 10%,
    100% 90%,
    90% 100%,
    10% 100%,
    0 90%,
    0 10%
  );
`

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  height: auto;
  padding-top: 120px;
  width: 100%;
`

const Hero = styled.button<{ isSelected?: boolean; side: 'left' | 'right' }>`
  ${clipPath}
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 110px;
  justify-content: center;
  padding: 24px 0;
  position: relative;
  width: 84px;
  box-sizing: border-box;

  &::after {
    ${clipPath}
    background: ${({ theme }) => `${theme.colors.dark}8E`};
    content: '';
    display: block;
    color: white;
    font-size: 2rem;
    left: 2px;
    height: calc(100% - 4px);
    position: absolute;
    top: 2px;
    width: calc(100% - 4px);
    visibility: hidden;
  }

  & span {
    display: flex !important;
  }

  & .name {
    visibility: hidden;
    z-index: 1;
  }

  &:hover {
    &::after {
      visibility: visible;
    }

    & .name {
      visibility: visible;
    }
  }

  &:focus {
    outline: none;

    & .name {
      visibility: visible;
    }

    &::after {
      background: ${({ theme }) => `${theme.colors.dark}9F`};
      visibility: visible;
    }
  }

  & .check {
    color: ${({ theme, side }) =>
      side === 'left' ? theme.colors.blue : theme.colors.red};
    left: 8px;
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  ${({ isSelected, side, theme }) =>
    isSelected &&
    css`
      background: ${side === 'left' ? theme.colors.blue : theme.colors.red};

      &::after {
        visibility: visible;
      }

      && .name {
        visibility: hidden;
      }
    `}
`

const HeroImg = styled(LazyLoadImage)`
  ${clipPath}
  width: 80px;
  height: 106px;
`

const HeroName = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`
