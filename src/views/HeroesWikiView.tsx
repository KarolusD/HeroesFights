import React from 'react'
import DiceScene from '_components/DiceScene/DiceScene'
import MainTemplate from '_templates/MainTemplate'
import styled from 'styled-components'

interface Props { }

const HeroesWikiView = (props: Props) => {
  return (
    <MainTemplate>
      <StyledH1>Work in progress. Coming soon...</StyledH1>
    </MainTemplate>
  )
}

export default HeroesWikiView

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.6rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
