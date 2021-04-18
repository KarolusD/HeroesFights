import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import MainTemplate from '../templates/MainTemplate'
import { useQuery } from 'react-query'
import { IHero } from '../types/types'
import styled from 'styled-components'
import Hero from '../components/Hero'

const MainSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  padding: 80px 320px 0 320px;
  width: 100%;
`

const Versus = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.4rem;
  margin-top: 108px;
`

interface Props {}

const HeroVsHeroView: React.FC<Props> = () => {
  const { isLoading, error, data } = useQuery('todos', async () => {
    const response = await fetch('http://localhost:5000/api/v1/heros')
    return await response.json()
  })

  const [player1Hero, setPlayer1Hero] = useState<IHero | undefined>()
  const [player2Hero, setPlayer2Hero] = useState<IHero | undefined>()

  return (
    <MainTemplate>
      <SideBar
        playerHero={player1Hero}
        heros={data}
        setPlayerHero={setPlayer1Hero}
        side="left"
      />
      <MainSection>
        <Hero playerHero={player1Hero} side="left" />
        <Versus>vs</Versus>
        <Hero playerHero={player2Hero} side="right" />
      </MainSection>
      <SideBar
        playerHero={player2Hero}
        heros={data}
        setPlayerHero={setPlayer2Hero}
        side="right"
      />
    </MainTemplate>
  )
}

export default HeroVsHeroView
