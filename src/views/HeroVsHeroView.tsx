import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import Hero from '../components/Hero/Hero'
import SideBar from '../components/SideBar/SideBar'
import StartButton from '../components/StartButton/StartButton'
import { useHerosContext } from '../hooks/useHerosContext'
import MainTemplate from '../templates/MainTemplate'

interface Props {}

const HeroVsHeroView = (props: Props) => {
  const { isLoading, error, data } = useQuery('heros', async () => {
    const response = await fetch('http://localhost:5000/api/v1/heros')
    return await response.json()
  })

  const { dispatch } = useHerosContext()

  useEffect(() => {
    dispatch({ type: 'SET_ALL_HEROS', payload: data })
  }, [data, dispatch])

  const handleFightStart = () => {
    dispatch({ type: 'START_HEROS_FIGHT', payload: true })
  }

  return (
    <MainTemplate>
      <SideBar side="left" />
      <MainSection>
        <FlexWrapper>
          <Hero side="left" />
          <Versus>vs</Versus>
          <Hero side="right" />
        </FlexWrapper>
        <StartButton onClick={handleFightStart} />
      </MainSection>
      <SideBar side="right" />
    </MainTemplate>
  )
}

export default HeroVsHeroView

const MainSection = styled.section`
  position: relative;
  min-height: 1000px;
  height: 100vh;
  padding: 16vh 24vw;
  width: 100%;

  @media (max-width: 1365px) {
    padding: 12vh 12vw;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24%;

  @media (max-width: 765px) {
    align-items: center;
    flex-direction: column;
  }
`

const Versus = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.4rem;
  margin-top: 108px;

  @media (max-width: 765px) {
    margin-top: 32px;
    margin-bottom: 24px;
  }
`
