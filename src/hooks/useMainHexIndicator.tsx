import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'

export const useMainHexIndicator = (
  roundWinner: string,
  roundDiceBonus: number
) => {
  const theme = useContext(ThemeContext)
  const [mainHexColor, setMainHexColor] = useState(theme.colors.darkGray)
  const [mainHexLabel, setMainHextLabel] = useState('')

  useEffect(() => {
    if (roundWinner === 'player1') {
      setMainHexColor(theme.colors.blue)
      setMainHextLabel(roundDiceBonus !== 0 ? `+${roundDiceBonus}` : '')
    }

    if (roundWinner === 'player2') {
      setMainHexColor(theme.colors.red)
      setMainHextLabel(roundDiceBonus !== 0 ? `+${roundDiceBonus}` : '')
    }

    if (roundWinner === 'tie') {
      setMainHexColor(theme.colors.violet)
      setMainHextLabel('tie')
    }

    if (!roundWinner) {
      setMainHexColor(theme.colors.darkGray)
      setMainHextLabel('')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundWinner])

  return { mainHexColor, mainHexLabel }
}
