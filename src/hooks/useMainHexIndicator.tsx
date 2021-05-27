import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { useHerosContext } from './useHerosContext'

export const useMainHexIndicator = (
  roundWinner: string,
  currentPowerStats: string
) => {
  const {
    state: { round },
  } = useHerosContext()
  const theme = useContext(ThemeContext)
  const [mainHexColor, setMainHexColor] = useState(theme.colors.darkGray)
  const [mainHexLabel, setMainHextLabel] = useState('')

  useEffect(() => {
    if (roundWinner === 'player1') {
      setMainHexColor(theme.colors.blue)
    }
    if (roundWinner === 'player2') {
      setMainHexColor(theme.colors.red)
    }
    if (roundWinner === 'tie') {
      setMainHexColor(theme.colors.violet)
    }
    console.log(roundWinner, '<--- round winner')
    if (roundWinner === '') {
      setMainHexColor(theme.colors.darkGray)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundWinner])

  return { mainHexColor, mainHexLabel }
}
