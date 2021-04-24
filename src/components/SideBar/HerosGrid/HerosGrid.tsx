import React, { Dispatch, useEffect, useRef } from 'react'
import { IHero } from '../../../types/types'
import styled from 'styled-components'
import HeroInGrid from './HeroInGrid/HeroInGrid'

interface Props {
  filteredHeros?: IHero[]
  playerHero?: IHero
  setPlayerHero: Dispatch<IHero>
  side: 'left' | 'right'
}

const HerosGrid = ({
  filteredHeros,
  playerHero,
  setPlayerHero,
  side,
}: Props) => {
  const gridRef = useRef<HTMLElement>(null)

  return (
    <StyledGrid ref={gridRef as React.RefObject<HTMLDivElement>}>
      {filteredHeros &&
        filteredHeros.map((hero) => (
          <HeroInGrid
            hero={hero}
            isSelected={!!playerHero && hero.id === playerHero.id}
            key={hero.id}
            setPlayerHero={setPlayerHero}
            playerHero={playerHero}
            side={side}
            root={gridRef?.current}
          />
        ))}
      <InvisiblePadding />
    </StyledGrid>
  )
}

export default HerosGrid

const StyledGrid = styled.div<{ height?: number }>`
  align-content: flex-start;
  display: grid;
  padding-bottom: 100px;
  padding-top: 100px;
  grid-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;

  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const InvisiblePadding = styled.div`
  background: transparent;
  height: 400px !important;
  width: 100%;
`
