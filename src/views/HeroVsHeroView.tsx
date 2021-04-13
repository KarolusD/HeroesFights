import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import MainTemplate from '../templates/MainTemplate'
import { useQuery } from 'react-query'
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
