import React from 'react'
import styled from 'styled-components'
import { WarningOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

interface Props {
  isVisible: boolean
  text: string
}

const SnackBar = ({ isVisible, text }: Props) => {
  const snackBarVariants = {
    visible: {
      display: 'flex',
      opacity: 1,
      y: 0,
    },
    hidden: { opacity: 0, y: -100, transitionEnd: { display: 'none' } },
  }

  const snackBarTransition = {
    type: 'ease',
    duration: '0.2',
  }

  return (
    <Container
      animate={isVisible ? 'visible' : 'hidden'}
      initial={isVisible ? 'visible' : 'hidden'}
      transition={snackBarTransition}
      variants={snackBarVariants}
    >
      <WarningOutlined />
      <Text>{text}</Text>
    </Container>
  )
}

const Container = styled(motion.div)`
  align-items: center;
  background: ${({ theme }) => theme.colors.dark};
  border: ${({ theme }) => `1px solid ${theme.colors.error}`};
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  left: calc(50% - 150px);
  min-height: 48px;
  padding: 16px 24px;
  position: absolute;
  top: 164px;
  width: 300px;
  z-index: 999;

  & > .anticon {
    color: ${({ theme }) => theme.colors.error};
  }
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-left: 12px;
`

export default SnackBar
