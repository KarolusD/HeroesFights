import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllHeroes } from '_api/heroesApi'
import styled from 'styled-components'
import Hexagon from '_assets/Hexagon'
import Hero from '_components/Hero/Hero'
import SideBar from '_components/SideBar/SideBar'
import SnackBar from '_components/SnackBar/SnackBar'
import StartButton, { Button } from '_components/StartButton/StartButton'
import { useHeroesContext } from '_hooks/useHeroesContext'
import { useHeroesFight } from '_hooks/useHeroesFight'
import { useMainHexIndicator } from '_hooks/useMainHexIndicator'
import MainTemplate from '_templates/MainTemplate'
import DiceScene from '_components/DiceScene/DiceScene'
import { calculateDiceScore } from '_helpers/calculateDiceScore'
import { useWinner } from '_hooks/useWinner'

const HeroVsHeroView = () => {
  const { error, data } = useQuery('heros', getAllHeroes)
  const {
    dispatch,
    state: { player1, player2, isHeroesFighting, heroesFightState },
  } = useHeroesContext()

  const [errorOcc, setErrorOcc] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { currentPowerStats, roundWinner, roundDiceBonus } = useHeroesFight({
    player1,
    player2,
  })

  const { winner } = useWinner({ player1, player2 })

  const { mainHexColor, mainHexLabel } = useMainHexIndicator(
    roundWinner,
    roundDiceBonus
  )

  useEffect(() => {
    dispatch({ type: 'SET_ALL_HEROES', payload: { allHeroes: data } })
    if (error) {
      setErrorOcc(true)
      setErrorMsg('Unable to download heroes data, please try again later :(')
    } else {
      setErrorOcc(false)
      setErrorMsg('')
    }
  }, [error, data, dispatch])

  const displayScore = (player: 'player1' | 'player2') => {
    let currPlayer = player === 'player1' ? player1 : player2
    if (currPlayer && currPlayer.dicePoints) {
      let diceCount = currPlayer.dicePoints.length
      let diceBonus = currPlayer.diceBonus ? currPlayer.diceBonus : 0

      let result = calculateDiceScore(currPlayer.dicePoints, diceBonus)
      return (
        <Score player={player}>
          {currPlayer.dicePoints.map((dice, idx) => {
            let specialChar = '+ '

            if (diceCount - 1 === idx && diceBonus === 0) {
              specialChar = `= ${result}`
            }

            return `${dice} ${specialChar}`
          })}
          {diceBonus !== 0 && <span>{`${diceBonus}`}</span>}
          {diceBonus !== 0 && ` = ${result}`}
        </Score>
      )
    }
  }

  const handleFightStart = () => {
    if (player1 && player2) {
      dispatch({ type: 'START_HEROES_FIGHT' })
      window.scrollTo(0, 0)
    } else {
      setErrorOcc(true)
      setErrorMsg('You have to choose both players to start fighting!')
      setTimeout(() => {
        setErrorOcc(false)
      }, 3000)
    }
  }

  const startRollingDice = () => {
    dispatch({
      type: 'UPDATE_FIGHT_STATE',
      payload: { heroesFightState: 'ROLLING DICE' },
    })
  }

  const handleFightEnd = () => {
    dispatch({ type: 'RESET_HEROES_POINTS' })
    dispatch({ type: 'END_HEROES_FIGHT' })
  }

  return (
    <MainTemplate>
      <SnackBar isVisible={errorOcc} text={errorMsg} />
      <SideBar side="left" />
      <MainSection isHeroesFighting={isHeroesFighting}>
        <FlexWrapper>
          <Hero
            side="left"
            dice={player1?.diceCount}
            currentPowerStats={currentPowerStats}
            isWinner={winner === 'player1'}
          />
          <Versus
            animate={isHeroesFighting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ type: 'ease', duration: '0.2' }}
          >
            vs
          </Versus>
          {isHeroesFighting && (
            <>
              <FightText
                animate="visible"
                initial="hidden"
                variants={fightTextVariants}
                transition={{ type: 'ease-out', duration: 0.8, delay: 0.6 }}
              >
                Fight!
              </FightText>
              <HexagonWrapper
                animate={
                  heroesFightState === 'START FIGHTING' ? 'visible' : 'hidden'
                }
                initial="hidden"
                variants={bigHexagonVariants}
                transition={{ type: 'spring', duration: 0.3, delay: 1 }}
              >
                <StyledHexagon fill={mainHexColor} width={92} height={92} />
                <StyledHexagonBorder
                  stroke={mainHexColor}
                  strokeWidth={0.5}
                  width={92}
                  height={92}
                />
                <HexagonText>{mainHexLabel}</HexagonText>
              </HexagonWrapper>
            </>
          )}
          <Hero
            side="right"
            dice={player2?.diceCount}
            currentPowerStats={currentPowerStats}
            isWinner={winner === 'player2'}
          />
        </FlexWrapper>
        <StartButton onClick={handleFightStart} />
        {heroesFightState === 'ROLLING READY' && (
          <RollingButton
            animate={
              heroesFightState === 'ROLLING READY' ? 'visible' : 'hidden'
            }
            initial="hidden"
            onClick={startRollingDice}
            transition={{ type: 'ease', duration: 0.5, delay: 1 }}
            variants={buttonVariants}
            disabled={heroesFightState !== 'ROLLING READY'}
          >
            Roll dice
          </RollingButton>
        )}
        {(heroesFightState === 'ROLLING DICE' ||
          heroesFightState === 'SCORE READY') && (
          <DiceSceneWrapper>
            <DiceScene />
          </DiceSceneWrapper>
        )}
        {(heroesFightState === 'SCORE READY' ||
          heroesFightState === 'WINNER SHOWN') && (
          <ScoreWrapper>
            {displayScore('player1')}{' '}
            {heroesFightState === 'SCORE READY' && <WhoWon>Who won?</WhoWon>}
            {displayScore('player2')}
          </ScoreWrapper>
        )}
        {heroesFightState === 'WINNER SHOWN' && (
          <ReturnHomeButton
            animate={heroesFightState === 'WINNER SHOWN' ? 'visible' : 'hidden'}
            initial="hidden"
            onClick={handleFightEnd}
            transition={{ type: 'ease', duration: 0.5, delay: 1 }}
            variants={buttonVariants}
          >
            Return home
          </ReturnHomeButton>
        )}
      </MainSection>
      <SideBar side="right" />
    </MainTemplate>
  )
}

export default HeroVsHeroView

const MainSection = styled.section<{ isHeroesFighting: boolean }>`
  position: relative;
  height: ${({ isHeroesFighting }) => (isHeroesFighting ? '100vh' : 'auto')};
  overflow: ${({ isHeroesFighting }) =>
    isHeroesFighting ? 'hidden' : 'scroll-y'};
  padding: 16vh 24vw;
  width: 100%;

  @media (max-width: 1365px) {
    padding: 12vh 12vw;
  }

  @media (max-width: 768px) {
    padding: ${({ isHeroesFighting }) =>
      isHeroesFighting ? '0' : '16vh 12vw 32vh 12vw'};
  }
`

const DiceSceneWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 80px;
  height: 100%;
  transition: 200ms ease;

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

const WhoWon = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.4rem;
  text-align: center;
`

const HexagonWrapper = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
`

const StyledHexagon = styled(Hexagon)`
  & path {
    transition: 250ms ease !important;
  }
`

const StyledHexagonBorder = styled(Hexagon)`
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  transform: ${({ stroke, theme }) =>
    stroke !== theme.colors.darkGray
      ? 'scale(1.4) translateX(1px)'
      : 'scale(1) translateX(0)'};

  height: auto;

  transition: 250ms ease;
`
const HexagonText = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  font-weight: 600;
  position: absolute;
  top: 1.4rem;
  left: 1.4rem;
`

const FightText = styled(motion.h3)`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 4rem;
  font-weight: 600;
  position: absolute;
  top: calc(50% - 48px);
  left: calc(50% - 88px);
  z-index: 100;
`

const RollingButton = styled(Button)`
  && {
    position: absolute;
    top: calc(50% - 28px);
    margin: 0;
  }
`

const ReturnHomeButton = styled(Button)`
  && {
    position: absolute;
    top: calc(50% - 28px);
    margin: 0;
    z-index: 100;
  }
`

const ScoreWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 3rem;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 360px;
  border: ${({ theme }) => `1px solid ${theme.colors.background}`};

  @media (max-width: 768px) {
    height: 200px;
    width: 320px;
  }
`

const Score = styled.p<{ player: 'player1' | 'player2' }>`
  background: ${({ theme }) => `${theme.colors.background}7E`};
  color: ${({ theme, player }) =>
    player === 'player1' ? theme.colors.blue : theme.colors.red};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 12px 16px;

  & > span {
    color: ${({ theme }) => theme.colors.success};
  }
  z-index: 99;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

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

const fightTextVariants = {
  visible: {
    scale: [3, 1, 0.5],
    opacity: [0, 1, 0],
    transitionEnd: { display: 'none' },
  },
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
}

const buttonVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}
