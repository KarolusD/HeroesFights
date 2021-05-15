import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import Hero from '../components/Hero/Hero'
import SideBar from '../components/SideBar/SideBar'
import SnackBar from '../components/SnackBar/SnackBar'
import StartButton from '../components/StartButton/StartButton'
import { useHerosContext } from '../hooks/useHerosContext'
import MainTemplate from '../templates/MainTemplate'

interface Props {}

const HeroVsHeroView = (props: Props) => {
  const { isLoading, error, data } = useQuery('heros', async () => {
    const response = await fetch('http://localhost:5000/api/v1/heros')
    return await response.json()
  })

  const [errOccurs, setErrOccurs] = useState(false)

  const {
    dispatch,
    state: { player1, player2, isHerosFighting },
  } = useHerosContext()

  useEffect(() => {
    dispatch({ type: 'SET_ALL_HEROS', payload: data })
  }, [data, dispatch])

  const handleFightStart = () => {
    if (player1 && player2) {
      dispatch({ type: 'START_HEROS_FIGHT' })
      window.scrollTo(0, 0)
    } else {
      setErrOccurs(true)
      setTimeout(() => {
        setErrOccurs(false)
      }, 3000)
    }
  }

  return (
    <MainTemplate>
      <SnackBar
        isVisible={errOccurs}
        text="You have to choose both players to start fighting!"
      />
      <SideBar side="left" />
      <MainSection isHerosFighting={isHerosFighting}>
        <FlexWrapper
          animate={isHerosFighting ? { height: '90%' } : { height: 'auto' }}
        >
          <Hero side="left" />
          <Versus
            animate={isHerosFighting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ type: 'ease', duration: '0.2' }}
          >
            vs
          </Versus>
          <Hero side="right" />
        </FlexWrapper>
        <StartButton onClick={handleFightStart} />
      </MainSection>
      <SideBar side="right" />
    </MainTemplate>
  )
}

export default HeroVsHeroView

const MainSection = styled.section<{ isHerosFighting: boolean }>`
  position: relative;
  min-height: 600px;
  height: 100vh;

  padding: 16vh 24vw;
  width: 100%;

  @media (max-width: 1365px) {
    padding: 12vh 12vw;
  }

  @media (max-width: 768px) {
    padding: ${({ isHerosFighting }) => (isHerosFighting ? '0' : '16vh 12vw')};
  }
`

const FlexWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24%;
  height: auto;

  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
`

const Versus = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.4rem;
  margin-top: 108px;

  @media (max-width: 768px) {
    margin-top: 32px;
    margin-bottom: 24px;
  }
`
