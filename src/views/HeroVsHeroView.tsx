import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import Hero from '../components/Hero/Hero'
import SideBar from '../components/SideBar/SideBar'
import StartButton from '../components/StartButton/StartButton'
import MainTemplate from '../templates/MainTemplate'
import { IHero } from '../types/types'

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
        <StartButton />
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

const MainSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  padding: 80px 24vw;
  width: 100%;
`

const Versus = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.4rem;
  margin-top: 108px;
`
