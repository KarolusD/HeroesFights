import React, { Dispatch, useState } from 'react'
import styled, { css } from 'styled-components'
import { useHeroSearch } from '../../hooks/useHeroSearch'
import { IHero } from '../../types/types'
import SearchBar from './SearchBar/SearchBar'
import HerosGrid from './HerosGrid/HerosGrid'

interface Props {
  playerHero?: IHero
  heros: IHero[]
  setPlayerHero: Dispatch<IHero>
  side: 'left' | 'right'
}

const SideBar = ({ heros, playerHero, setPlayerHero, side }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { filteredHeros } = useHeroSearch(heros, searchTerm)

  return (
    <Container side={side}>
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
  )
}

export default React.memo(SideBar)

const Container = styled.section<{ side: string }>`
  background: ${({ theme }) => `${theme.colors.dark}32`};
  height: 100vh;
  padding: 80px 16px 0 16px;
  position: absolute;
  top: 0;
  min-width: 320px;
  width: 24vw;

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
    `} /* @media (max-width: 1365px) {
    display: none;
  } */
`

const SearchForm = styled.form`
  margin-top: 24px;
  position: sticky;
  width: 100%;
  z-index: 1;
`
