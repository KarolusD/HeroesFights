import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import styled, { css } from 'styled-components'
import { useHeroesContext } from '_hooks/useHeroesContext'
import { useHeroSearch } from '_hooks/useHeroSearch'
import { useSideBar } from '_hooks/useSideBar'
import HerosGrid from './HerosGrid/HerosGrid'
import SearchBar from './SearchBar/SearchBar'

interface Props {
  side: 'left' | 'right'
}

const SideBar = ({ side }: Props) => {
  const [isOpen, setIsOpen] = useSideBar()
  const [searchTerm, setSearchTerm] = useState('')

  const {
    state: { allHeros, isHeroesFighting },
  } = useHeroesContext()

  const { filteredHeros } = useHeroSearch(allHeros, searchTerm)

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

  const sideBarVariants = {
    visible: {
      display: 'block',
      x: 0,
      transitionEnd: { x: 0 },
    },
    hidden: {
      overflow: 'hidden',
      x: side === 'left' ? '-100%' : '100%',
      transitionEnd: { display: 'none' },
    },
  }

  const sideBarTransition = {
    type: 'ease',
    duration: 0.25,
  }

  return (
    <>
      <ContainerShadow isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <Container
        animate={isOpen ? 'visible' : 'hidden'}
        initial={isOpen ? 'visible' : 'hidden'}
        side={side}
        transition={sideBarTransition}
        variants={sideBarVariants}
        {...handlers}
      >
        <SearchForm
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {allHeros && <SearchBar setSearchTerm={setSearchTerm} />}
        </SearchForm>

        <HerosGrid filteredHeros={filteredHeros} side={side} />
      </Container>
      <SideBarButton
        $isOpen={isOpen}
        $isVisible={!isOpen && !isHeroesFighting}
        onClick={() => setIsOpen(!isOpen)}
        side={side}
      >
        <SideText side={side}>
          {side === 'left' ? 'Select player 1 hero' : 'Select player 2 hero'}
        </SideText>
      </SideBarButton>
    </>
  )
}

export default React.memo(SideBar)

const Container = styled(motion.section)<{ side: 'left' | 'right' }>`
  background: ${({ theme }) => `${theme.colors.dark}7E`};
  height: 100vh;
  padding: 80px 16px 0 16px;
  position: absolute;
  top: 0;
  min-width: 320px;
  width: 24vw;
  z-index: 99;

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
    width: 80vw;
  }

  @media (max-width: 320px) {
    min-width: 256px;
  }
`

const ContainerShadow = styled.div<{ isOpen: boolean }>`
  background: rgba(0, 0, 0, 0.85);
  display: none;
  height: 100vh;
  width: 100vw;
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

const SideText = styled.p<{ side: 'left' | 'right' }>`
  align-items: center;
  color: ${({ side, theme }) =>
    side === 'left' ? theme.colors.blue : theme.colors.red};
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  justify-content: center;
  transform: ${({ side }) =>
    side === 'left' ? 'rotateZ(-90deg)' : 'rotateZ(90deg)'};
  white-space: nowrap;
`

interface ISideBarButton {
  side: 'left' | 'right'
  $isOpen: boolean
  $isVisible: boolean
}

const SideBarButton = styled(motion.button)<ISideBarButton>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;
  height: 242px;
  width: 45px;
  top: 40%;
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

  ${({ side, $isOpen }) =>
    side === 'left'
      ? css`
          clip-path: polygon(100% 15%, 100% 85%, 0 100%, 0 0);
          left: 0;
          opacity: ${() => ($isOpen ? 0 : 1)};
          &::after {
            left: 0;
          }
        `
      : css`
          clip-path: polygon(100% 0, 100% 100%, 0 85%, 0 15%);
          opacity: ${() => ($isOpen ? 0 : 1)};
          right: 0;
          &::after {
            right: 0;
          }
        `}

  @media (max-width: 1365px) {
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  }
`
