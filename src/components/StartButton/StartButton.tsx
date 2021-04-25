import React from 'react'
import styled from 'styled-components'

interface Props {}

const StartButton = (props: Props) => {
  return <Button>Start fighting!</Button>
}

export default StartButton

const Button = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  bottom: 10%;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  height: 56px;
  left: 50%;
  padding: 0 60px;
  position: absolute;
  transform: translateX(-50%);
  transition: background 200ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    &::after {
      opacity: 1;
    }
  }

  &:focus {
    /* outline: none; */
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
