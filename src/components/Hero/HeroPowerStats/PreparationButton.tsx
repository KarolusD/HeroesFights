import React from 'react'
import styled from 'styled-components'

interface IStyledPrepBtn {
  side: 'left' | 'right'
  isSelected?: boolean
}

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isSelected?: boolean
  side: 'left' | 'right'
  preparation: 'unprepared' | 'prepared' | 'fully-prepared'
}

const PreparationButton = ({
  onClick,
  isSelected,
  side,
  preparation,
}: Props) => {
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement>,
    prep: string
  ) => {
    const target = event.target as HTMLElement
    const siblings = target.parentElement
      ?.children as HTMLCollectionOf<HTMLElement>

    Array.from(siblings).forEach((elem) => {
      if (elem !== target) {
        elem.style.width = '0'
        elem.style.opacity = '0'
      } else {
        elem.style.width = '100%'
        elem.innerText = prep
      }
    })
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLButtonElement>,
    prep: string
  ) => {
    const target = event.target as HTMLElement
    const siblings = target.parentElement
      ?.children as HTMLCollectionOf<HTMLElement>

    Array.from(siblings).forEach((elem) => {
      if (elem === target) {
        elem.innerText = prep.charAt(0)
      }
      elem.style.width = ''
      elem.style.opacity = '1'
    })
  }

  return (
    <StyledPrepBtn
      onClick={onClick}
      onMouseEnter={(e) => handleMouseEnter(e, preparation)}
      onMouseLeave={(e) => handleMouseLeave(e, preparation)}
      isSelected={isSelected}
      side={side}
    >
      {preparation.charAt(0)}
    </StyledPrepBtn>
  )
}

export default PreparationButton

const StyledPrepBtn = styled.button<IStyledPrepBtn>`
  background: ${({ isSelected, side, theme }) => {
    if (isSelected) {
      return side === 'left' ? theme.colors.blue : theme.colors.red
    }
    return 'transparent'
  }};
  border: ${({ side, theme }) =>
    side === 'left'
      ? `1px solid ${theme.colors.blue}`
      : `1px solid ${theme.colors.red}`};
  box-shadow: none;
  color: ${({ isSelected, side, theme }) => {
    if (isSelected) {
      return theme.colors.background
    }
    return side === 'left' ? theme.colors.blue : theme.colors.red
  }};
  cursor: pointer;
  height: 40px;
  overflow: hidden;
  text-transform: capitalize;
  transition: 200ms ease;
  width: 40px;
  white-space: nowrap;

  &:hover,
  &:focus {
    outline: none;
    background: ${({ isSelected, theme }) => {
      if (!isSelected) {
        return theme.colors.almostBackground
      }
    }};
  }
`
