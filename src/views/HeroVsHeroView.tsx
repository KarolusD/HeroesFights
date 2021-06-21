import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllHeros } from '_api/herosApi'
import styled, { css, keyframes, ThemeContext } from 'styled-components'
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
import { IHero } from '_types/types'

const HeroVsHeroView = () => {
  const { isLoading, error, data } = useQuery('heros', getAllHeros)

  const [isRolling, setIsRolling] = useState(false)
  const [isScoreReady, setIsScoreReady] = useState(false)
  const [diceLandedCount, setDiceLandedCount] = useState(0)

  const [errorOcc, setErrorOcc] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const {
    dispatch,
    state: { player1, player2, isHeroesFighting },
  } = useHeroesContext()

  const { currentPowerStats, roundWinner, roundDiceBonus, isRollingDiceReady } =
    useHeroesFight(player1, player2)

  const { mainHexColor, mainHexLabel } = useMainHexIndicator(
    roundWinner,
    roundDiceBonus
  )

  useEffect(() => {
    dispatch({ type: 'SET_ALL_HEROS', payload: { allHeros: data } })
    if (error) {
      setErrorOcc(true)
      setErrorMsg('Unable to download heroes data, please try again later :(')
    } else {
      setErrorOcc(false)
      setErrorMsg('')
    }
  }, [error, data, dispatch])

  const handleFightStart = () => {
    if (player1 && player2) {
      dispatch({ type: 'START_HEROS_FIGHT' })
      window.scrollTo(0, 0)
    } else {
      setErrorOcc(true)
      setErrorMsg('You have to choose both players to start fighting!')
      setTimeout(() => {
        setErrorOcc(false)
        setErrorMsg('')
      }, 3000)
    }
  }

  const updateDice = (faceUp: number) => {
    setDiceLandedCount((count) => count + 1)
  }

  const displayScore = (player: 'player1' | 'player2') => {
    let currPlayer = player === 'player1' ? player1 : player2
    if (currPlayer && currPlayer.dicePoints) {
      let diceCount = currPlayer.dicePoints.length
      let diceBonus = currPlayer.diceBonus ? currPlayer.diceBonus : 0

      let result = 0
      return (
        <Score player={player}>
          {currPlayer.dicePoints.map((dice, idx) => {
            result += dice
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

  return (
    <MainTemplate>
      <SnackBar isVisible={errorOcc} text={errorMsg} />
      <SideBar side="left" />
      <MainSection isHeroesFighting={isHeroesFighting}>
        <FlexWrapper
          animate={isHeroesFighting ? { height: '640px' } : { height: 'auto' }}
        >
          <Hero
            side="left"
            dice={player1?.diceCount}
            isRollingDiceReady={isRollingDiceReady}
            currentPowerStats={currentPowerStats}
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
                transition={{ type: 'ease-out', duration: 0.8, delay: 1.2 }}
              >
                Fight!
              </FightText>
              <HexagonWrapper
                animate={isRollingDiceReady ? 'hidden' : 'visible'}
                initial="hidden"
                variants={bigHexagonVariants}
                transition={{ type: 'spring', duration: 0.3, delay: 1 }}
              >
                <StyledHexagon fill={mainHexColor} width={92} height={92} />
                <StyledHexagonBorder
                  stroke={mainHexColor}
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
            isRollingDiceReady={isRollingDiceReady}
            currentPowerStats={currentPowerStats}
          />
        </FlexWrapper>
        <StartButton onClick={handleFightStart} />
        {isRollingDiceReady && (
          <RollingButton
            animate={isRollingDiceReady && !isRolling ? 'visible' : 'hidden'}
            initial="hidden"
            onClick={() => setIsRolling(true)}
            transition={{ type: 'ease', duration: 0.5, delay: 1 }}
            variants={rollingButtonVariants}
          >
            Roll dice
          </RollingButton>
        )}
      </MainSection>
      <SideBar side="right" />
      {isRolling && (
        <DiceSceneWrapper>
          <DiceScene
            diceLandedCount={diceLandedCount}
            setIsScoreReady={setIsScoreReady}
            player1DiceNumber={player1?.diceCount?.filter((d) => d).length}
            player2DiceNumber={player2?.diceCount?.filter((d) => d).length}
            updateDice={updateDice}
          />
        </DiceSceneWrapper>
      )}
      {isScoreReady && (
        <ScoreWrapper>
          {displayScore('player1')} {displayScore('player2')}
        </ScoreWrapper>
      )}
    </MainTemplate>
  )
}

export default HeroVsHeroView

const MainSection = styled.section<{ isHeroesFighting: boolean }>`
  position: relative;
  min-height: 600px;
  height: 100vh;

  padding: 16vh 24vw;
  width: 100%;

  @media (max-width: 1365px) {
    padding: 12vh 12vw;
  }

  @media (max-width: 768px) {
    padding: ${({ isHeroesFighting }) =>
      isHeroesFighting ? '0' : '16vh 12vw'};
  }
`

const DiceSceneWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const FlexWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 160px;
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
  top: 45%;
  transform: translate(-50%, -50%) !important;

  @media (max-width: 768px) {
    transform: translateX(-50%) !important;
  }
`

const StyledHexagon = styled(Hexagon)`
  & path {
    transition: 250ms ease !important;
  }
`

const StyledHexagonBorder = styled(Hexagon)`
  position: absolute;
  top: 1px;
  left: 1.25px;
  transform: ${({ stroke, theme }) =>
    stroke !== theme.colors.darkGray ? 'scale(1.4)' : 'scale(1)'};
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
  font-size: 4rem;
  font-weight: 600;
  position: absolute;
  top: 20%;
  left: calc(50% - 100px);
`

const RollingButton = styled(Button)`
  && {
    position: absolute;
    top: 45%;
  }
`

const ScoreWrapper = styled.div`
  font-size: 3rem;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Score = styled.p<{ player: 'player1' | 'player2' }>`
  color: ${({ theme, player }) =>
    player === 'player1' ? theme.colors.blue : theme.colors.red};
  font-size: 3rem;
  text-align: center;
  & > span {
    color: ${({ theme }) => theme.colors.success};
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
  },
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
}

const rollingButtonVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}
