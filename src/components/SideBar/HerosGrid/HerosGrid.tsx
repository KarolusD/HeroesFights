import React, { useRef } from 'react'
import styled from 'styled-components'
import { useHerosContext } from '../../../hooks/useHerosContext'
import { IHero } from '../../../types/types'
import HeroInGrid from './HeroInGrid/HeroInGrid'

interface Props {
  filteredHeros?: IHero[]
  side: 'left' | 'right'
}

const HerosGrid = ({ filteredHeros, side }: Props) => {
  const gridRef = useRef<HTMLElement>(null)

  const {
    state: { player1, player2 },
  } = useHerosContext()

  return (
    <StyledGrid ref={gridRef as React.RefObject<HTMLDivElement>}>
      {filteredHeros &&
        filteredHeros.map((hero) => (
          <HeroInGrid
            isSelected={
              (side === 'left' && hero.id === player1?.id) ||
              (side === 'right' && hero.id === player2?.id)
            }
            hero={hero}
            key={hero.id}
            side={side}
            root={gridRef?.current}
          />
        ))}
      <InvisiblePadding />
    </StyledGrid>
  )
}

export default HerosGrid

const StyledGrid = styled.div`
  align-content: flex-start;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  height: 100%;
  justify-items: center;
  left: 0;
  padding: 180px 16px 100px 16px;
  position: absolute;
  top: 0;
  width: 100%;

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
