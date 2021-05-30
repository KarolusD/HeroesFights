import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Hexagon from '_assets/Hexagon'

interface Props {
  dice?: boolean[]
  side: 'left' | 'right'
}

const DiceIndicator = ({ dice, side }: Props) => {
  const theme = useContext(ThemeContext)
  console.log(theme, 'DiceIndicator')
  const wrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring' } },
  }

  return (
    <Wrapper animate="visible" initial="hidden" variants={wrapperVariants}>
      {dice?.map((die, idx) => (
        <motion.div key={`${die}-${idx}`} variants={itemVariants}>
          <StyledHexagon
            stroke={side === 'left' ? theme.colors.blue : theme.colors.red}
            fill={side === 'left' ? theme.colors.blue : theme.colors.red}
            fillOpacity={die ? '1' : '0.2'}
          />
        </motion.div>
      ))}
    </Wrapper>
  )
}

export default DiceIndicator

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const StyledHexagon = styled(Hexagon)`
  margin: 3px 0;
`
