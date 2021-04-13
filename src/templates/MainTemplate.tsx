import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

interface Props {}

const Container = styled.main`
  background: ${({ theme }) => `linear-gradient(
      270deg,
      rgba(234, 106, 106, 0.12) 0%,
      rgba(234, 106, 106, 0) 80%
    ), linear-gradient(
      90deg,
      rgba(106, 157, 234, 0.12) 0%,
      rgba(106, 157, 234, 0) 80%
    ), ${theme.colors.background}`};
  height: 100vh;
  width: 100vw;
`

const MainTemplate: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}

export default MainTemplate
