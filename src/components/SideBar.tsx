import React, { Dispatch, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'
import { IHero } from '../types/types'
import SearchBar from './SearchBar'

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

const Container = styled.section<{ side: string }>`
  background: ${({ theme }) => `${theme.colors.dark}32`};
  height: 100vh;
  overflow-y: scroll;
  padding: 104px 16px;
  position: absolute;
  scrollbar-width: none;
  top: 0;
  width: 320px;

  &::-webkit-scrollbar {
    display: none;
  }

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
`

const HerosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 90px;
`

const Hero = styled.button<{ isSelected?: boolean; side: 'left' | 'right' }>`
  ${clipPath}
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 110px;
  position: relative;
  width: 84px;

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

    &::after {
      background: ${({ theme }) => `${theme.colors.dark}9F`};
      visibility: visible;
    }

    & .name {
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

const SearchForm = styled.form`
  position: fixed;
  width: 284px;
  z-index: 1;
`
interface Props {
  playerHero?: IHero
  heros: IHero[]
  setPlayerHero: Dispatch<IHero>
  side: 'left' | 'right'
}

const SideBar: React.FC<Props> = ({
  heros,
  playerHero,
  setPlayerHero,
  side,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredHeros, setFilteredHeros] = useState<IHero[] | undefined>()

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredHeros(heros)
    }
    if (heros && searchTerm !== '') {
      const results = heros.filter((hero) => {
        let regEx = new RegExp(`${searchTerm.trim()}`, 'gi')
        //  /(\bt\S+\b)/ig
        return regEx.test(hero.name)
      })
      setFilteredHeros(results)
    }
  }, [searchTerm, heros])

  return (
    <Container side={side}>
      <SearchForm>
        {filteredHeros && <SearchBar setSearchTerm={setSearchTerm} />}
      </SearchForm>
      <HerosGrid>
        {filteredHeros &&
          filteredHeros.map((hero: IHero) => (
            <Hero
              isSelected={playerHero && hero.id === playerHero.id}
              key={hero.id}
              onClick={() => setPlayerHero(hero)}
              side={side}
            >
              <HeroImg src={hero.images.md} />
              {playerHero && hero.id === playerHero.id && (
                <CheckOutlined className="check" />
              )}
              <HeroName className="name">{hero.name}</HeroName>
            </Hero>
          ))}
      </HerosGrid>
    </Container>
  )
}

export default SideBar
