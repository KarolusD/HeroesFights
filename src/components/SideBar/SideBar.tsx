import React, { Dispatch, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import styled, { css } from 'styled-components'
import { useHeroSearch } from '../../hooks/useHeroSearch'
import { IHero } from '../../types/types'
import HerosGrid from './HerosGrid/HerosGrid'
import SearchBar from './SearchBar/SearchBar'

interface Props {
  playerHero?: IHero
  heros: IHero[]
  setPlayerHero: Dispatch<IHero>
  side: 'left' | 'right'
}

const SideBar = ({ heros, playerHero, setPlayerHero, side }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { filteredHeros } = useHeroSearch(heros, searchTerm)

  const handleSwipeLeft = () => {
    if (isOpen && side === 'left') {
      setIsOpen(false)
    }
  }

  const handleSwipeRight = () => {
    if (isOpen && side === 'right') {
      setIsOpen(false)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
  })

  return (
    <>
      <ContainerShadow isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <Container isOpen={isOpen} side={side} {...handlers}>
        <SearchForm
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {heros && <SearchBar setSearchTerm={setSearchTerm} />}
        </SearchForm>

        <HerosGrid
          filteredHeros={filteredHeros}
          playerHero={playerHero}
          setPlayerHero={setPlayerHero}
          side={side}
        />
      </Container>
      <SideBarButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        side={side}
      >
        {side === 'left' ? `🦸‍♀️` : `🦸‍♂️`}
      </SideBarButton>
    </>
  )
}

export default React.memo(SideBar)

const Container = styled.section<{ side: 'left' | 'right'; isOpen: boolean }>`
  background: ${({ theme }) => `${theme.colors.dark}7E`};
  height: 100vh;
  padding: 80px 16px 0 16px;
  position: absolute;
  top: 0;
  min-width: 320px;
  width: 24vw;
  z-index: 1;

  ${({ side, theme }) =>
    side === 'left' &&
    css`
      border-right: 1px solid ${theme.colors.almostBackground};
      left: 0;
    `}

  ${({ side, theme }) =>
    side === 'right' &&
    css`
      border-left: 1px solid ${theme.colors.almostBackground};
      right: 0;
    `}
  
  @media (max-width: 1365px) {
    background: ${({ theme }) => `${theme.colors.dark}`};
    transform: ${({ side }) =>
      side === 'left' ? 'transformX(-100%)' : 'transformX(100%)'};
    opacity: 0;
    transition: 200ms ease;
    visibility: hidden;

    ${({ isOpen }) =>
      isOpen &&
      css`
        opacity: 1;
        width: 80vw;
        transform: translateX(0%);
        visibility: visible;
        z-index: 99;
      `}
  }
`

const ContainerShadow = styled.div<{ isOpen: boolean }>`
  background: rgba(0, 0, 0, 0.85);
  display: none;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  @media (max-width: 1365px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`

const SearchForm = styled.form`
  margin-top: 24px;
  position: sticky;
  width: 100%;
  z-index: 1;
`

const SideBarButton = styled.button<{
  side: 'left' | 'right'
  isOpen: boolean
}>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;
  height: 242px;
  width: 45px;
  top: 16%;
  position: absolute;
  transition: 200ms ease, right 200ms ease;
  z-index: 98;

  &::before {
    background: ${({ side, theme }) =>
      side === 'left' ? `${theme.colors.blue}` : `${theme.colors.red}`};
    content: '';
    height: 156px;
    left: ${({ side }) => (side === 'left' ? '44px' : '0px')};
    position: absolute;
    top: 44px;
    width: 1px;
    z-index: 1;
  }

  &::after {
    background: ${({ side, theme }) =>
      side === 'left' ? `${theme.colors.blue}21` : `${theme.colors.red}21`};
    content: '';
    height: 240px;
    position: absolute;
    top: 1px;
    width: 44px;
    z-index: -1;
  }

  ${({ side, isOpen }) =>
    side === 'left'
      ? css`
          clip-path: polygon(100% 15%, 100% 85%, 0 100%, 0 0);
          left: ${() => (isOpen ? '80vw' : '0')};
          z-index: ${() => (isOpen ? '100' : '98')};
          &::after {
            left: 0;
          }
        `
      : css`
          clip-path: polygon(100% 0, 100% 100%, 0 85%, 0 15%);
          right: ${() => (isOpen ? '80vw' : '0')};
          z-index: ${() => (isOpen ? '100' : '98')};
          &::after {
            right: 0;
          }
        `}

  @media (max-width: 1365px) {
    display: block;
  }
`
