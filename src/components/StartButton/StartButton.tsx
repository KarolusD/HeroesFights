import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { useHerosContext } from '../../hooks/useHerosContext'

interface Props {
  onClick?: () => void
}

const StartButton = ({ onClick }: Props) => {
  const startButtonVariants = {
    visible: { top: 0, opacity: 1 },
    hidden: { top: 100, opacity: 0, transitionEnd: { display: 'none' } },
  }

  const startButtonTranstion = {
    type: 'ease',
    duration: 0.2,
  }

  const {
    state: { isHerosFighting },
  } = useHerosContext()

  return (
    <Button
      animate={isHerosFighting ? 'hidden' : 'visible'}
      initial={isHerosFighting ? 'hidden' : 'visible'}
      onClick={onClick}
      transition={startButtonTranstion}
      variants={startButtonVariants}
    >
      Start fighting!
    </Button>
  )
}

export default StartButton

const Button = styled(motion.button)`
  background: transparent;
  border: none;
  box-shadow: none;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  height: 56px;
  left: 50%;
  padding: 0 60px;
  position: relative;
  transform: translateX(-50%);
  transition: background 200ms ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    &::after {
      opacity: 1;
    }
  }

  &:focus {
    background: ${({ theme }) => theme.colors.almostBackground};
  }

  &::before,
  &::after {
    content: '';
    height: 56px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    visibility: visible;
    z-index: -1;
  }

  &::before {
    clip-path: polygon(
      0% 0%,
      0% 100%,
      0.5% 100%,
      0.5% 2%,
      99.5% 2%,
      99.5% 98%,
      0% 98%,
      0% 100%,
      100% 100%,
      100% 0%
    );
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.colors.blue} 0%, ${theme.colors.violet} 50%, ${theme.colors.red} 100%)`};
  }

  &::after {
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.colors.blue} 0%, ${theme.colors.violet} 50%, ${theme.colors.red} 100%)`};
    opacity: 0;
    transition: 200ms ease;
  }
`
