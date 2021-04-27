import { CheckOutlined } from '@ant-design/icons'
import React, { ChangeEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import placeholder from '../../../../assets/placeholder.png'
import { useHerosContext } from '../../../../hooks/useHerosContext'
import { useLazyImage } from '../../../../hooks/useLazyImage'
import { IHero } from '../../../../types/types'

interface Props {
  isSelected: boolean
  hero: IHero
  side: 'left' | 'right'
  root: HTMLElement | null
}

const HeroInGrid = ({ isSelected, hero, side, root }: Props) => {
  const [imageRef, setImageRef] = useState<HTMLElement | null>(null)
  const { lazyImageSrc } = useLazyImage(
    {
      imageRef: imageRef as HTMLElement,
      imageSrc: hero.images.sm,
    },
    {
      root,
      rootMargin: '0px 0px 1000px 0px',
    }
  )

  const { dispatch } = useHerosContext()

  const handlePlayerHeroSetting = () => {
    if (side === 'left') {
      dispatch({ type: 'SET_PLAYER_1', payload: hero })
    }

    if (side === 'right') {
      dispatch({ type: 'SET_PLAYER_2', payload: hero })
    }
  }

  const onLoad = (event: ChangeEvent<HTMLImageElement>) => {
    event.target.classList.add('loaded')
  }

  const onError = (event: ChangeEvent<HTMLImageElement>) => {
    event.target.classList.add('has-error')
  }

  return (
    <HeroMiniCard
      ref={setImageRef}
      isSelected={isSelected}
      onClick={handlePlayerHeroSetting}
      side={side}
    >
      <HeroImg
        alt={hero?.name}
        height={106}
        onLoad={onLoad}
        onError={onError}
        src={lazyImageSrc}
        width={80}
      />

      {isSelected && <CheckOutlined className="check" />}
      <HeroName className="name">{hero?.name}</HeroName>
    </HeroMiniCard>
  )
}

export default HeroInGrid

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
const HeroMiniCard = styled.button<{
  isSelected?: boolean
  side: 'left' | 'right'
}>`
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

const HeroImg = styled.img`
  ${clipPath}
  filter: blur(15px);
  height: 106px;
  opacity: 0;
  width: 80px;

  @keyframes loaded {
    0% {
      opacity: 0;
      filter: blur(15px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
    }
  }

  &.loaded:not(.has-error) {
    animation: loaded 300ms ease;
    animation-fill-mode: forwards;
  }

  &.has-error {
    content: url(${placeholder});
  }

  &::before {
  }
`

const HeroName = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`
