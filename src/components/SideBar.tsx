import React, { Dispatch, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'
import { IHero } from '../types/types'
import SearchBar from './SearchBar'
import { Grid, WindowScroller } from 'react-virtualized'

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
  padding: 80px 16px;
  position: absolute;
  top: 0;
  width: 320px;

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

const HerosGrid = styled(Grid)`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
  max-height: 110px;
  max-width: 84px;
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
  margin-top: 24px;
  position: fixed;
  width: 284px;
  z-index: 1;
`

const RegisteredGrid = styled.div<{ height: number }>`
  margin-top: 100px;
  overflow: hidden;
  height: ${({ height }) => `${height - 180}px`};
`

const COLUMN_COUNT = 3

interface Props {
  playerHero?: IHero
  heros: IHero[]
  setPlayerHero: Dispatch<IHero>
  side: 'left' | 'right'
}

const SideBar = ({ heros, playerHero, setPlayerHero, side }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredHeros, setFilteredHeros] = useState<IHero[] | undefined>()

  useEffect(() => {
    if (heros && searchTerm !== '') {
      const results = heros.filter((hero) => {
        let regEx = new RegExp(`${searchTerm.trim()}`, 'gi')
        //  /(\bt\S+\b)/ig
        return regEx.test(hero.name)
      })
      setFilteredHeros(results)
    } else if (heros) {
      setFilteredHeros(heros)
    }
  }, [searchTerm, heros])

  const cellRenderer = ({ key, columnIndex, rowIndex, style }: any) => {
    let hero: any = null
    if (filteredHeros) {
      hero =
        filteredHeros[
          (rowIndex + 1) * COLUMN_COUNT - (COLUMN_COUNT - columnIndex)
        ]
    }

    return (
      hero && (
        <Hero
          isSelected={playerHero && hero.id === playerHero.id}
          key={key}
          onClick={() => setPlayerHero(hero)}
          side={side}
          style={style}
        >
          <HeroImg src={hero.images?.md} />
          {playerHero && hero.id === playerHero.id && (
            <CheckOutlined className="check" />
          )}
          <HeroName className="name">{hero?.name}</HeroName>
        </Hero>
      )
    )
  }

  return (
    <Container side={side}>
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {heros && <SearchBar setSearchTerm={setSearchTerm} />}
      </SearchForm>
      {filteredHeros && (
        <WindowScroller>
          {({ isScrolling, registerChild, height }) => (
            <RegisteredGrid ref={registerChild} height={height}>
              <HerosGrid
                aria-label="none"
                containerStyle={{
                  width: '284px',
                  maxWidth: 'none',
                }}
                cellRenderer={cellRenderer}
                columnCount={COLUMN_COUNT}
                columnWidth={102}
                height={height}
                isScrolling={isScrolling}
                rowCount={Math.max(
                  1,
                  Math.round(filteredHeros.length / COLUMN_COUNT)
                )}
                rowHeight={124}
                width={284}
              />
            </RegisteredGrid>
          )}
        </WindowScroller>
      )}
    </Container>
  )
}

export default React.memo(SideBar)
