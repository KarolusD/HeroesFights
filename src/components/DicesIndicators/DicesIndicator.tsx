import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Hexagon from '../../assets/Hexagon'

interface Props {
  dices: boolean[]
  side: 'left' | 'right'
}

const DicesIndicator = ({ dices, side }: Props) => {
  const theme = useContext(ThemeContext)

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
      {dices.map((dice, idx) => (
        <motion.div key={`${dice}-${idx}`} variants={itemVariants}>
          <StyledHexagon
            stroke={side === 'left' ? theme.colors.blue : theme.colors.red}
            fill={side === 'left' ? theme.colors.blue : theme.colors.red}
            fillOpacity={dice ? '1' : '0.2'}
          />
        </motion.div>
      ))}
    </Wrapper>
  )
}

export default DicesIndicator

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const StyledHexagon = styled(Hexagon)`
  margin: 3px 0;
`
