import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled, { ThemeContext } from 'styled-components'
import Hexagon from '../assets/Hexagon'
import Hero from '../components/Hero/Hero'
import SideBar from '../components/SideBar/SideBar'
import SnackBar from '../components/SnackBar/SnackBar'
import StartButton from '../components/StartButton/StartButton'
import { useHerosContext } from '../hooks/useHerosContext'
import { useHerosFight } from '../hooks/useHerosFight'
import { useMainHexIndicator } from '../hooks/useMainHexIndicator'
import MainTemplate from '../templates/MainTemplate'
import { IHero } from '../types/types'

interface Props {}

const HeroVsHeroView = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { isLoading, error, data } = useQuery('heros', async () => {
    const response = await fetch('http://localhost:5000/api/v1/heros')
    return await response.json()
  })

  const {
    dispatch,
    state: { player1, player2, isHerosFighting },
  } = useHerosContext()

  const { player1Dices, player2Dices, currentPowerStats, roundWinner } =
    useHerosFight(player1, player2)

  console.log('re-render hello from here!!!')

  const { mainHexColor, mainHexLabel } = useMainHexIndicator(
    roundWinner,
    currentPowerStats
  )
  useEffect(() => {
    dispatch({ type: 'SET_ALL_HEROS', payload: { allHeros: data } })
  }, [data, dispatch])

  const [errorOcc, setErrorOcc] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleFightStart = () => {
    if (player1 && player2) {
      dispatch({ type: 'START_HEROS_FIGHT' })
      window.scrollTo(0, 0)
    } else {
      setErrorOcc(true)
      setErrorMsg('You have to choose both players to start fighting!')
      setTimeout(() => {
        setErrorOcc(false)
      }, 3000)
    }
  }

  const bigHexagonVariants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
  }

  return (
    <MainTemplate>
      <SnackBar isVisible={errorOcc} text={errorMsg} />
      <SideBar side="left" />
      <MainSection isHerosFighting={isHerosFighting}>
        <FlexWrapper
          animate={isHerosFighting ? { height: '90%' } : { height: 'auto' }}
        >
          <Hero
            side="left"
            dices={player1Dices}
            currentPowerStats={currentPowerStats}
          />
          <Versus
            animate={isHerosFighting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ type: 'ease', duration: '0.2' }}
          >
            vs
          </Versus>
          {isHerosFighting && (
            <HexagonWrapper
              animate="visible"
              initial="hidden"
              variants={bigHexagonVariants}
              transition={{ type: 'spring', duration: 0.3, delay: 1.1 }}
            >
              <Hexagon fill={mainHexColor} width={92} height={92} />
            </HexagonWrapper>
          )}
          <Hero
            side="right"
            dices={player2Dices}
            currentPowerStats={currentPowerStats}
          />
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

const HexagonWrapper = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    transform: translateX(-50%) !important;
  }
`
