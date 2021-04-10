import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

interface Props {}

const Container = styled.main`
  background: ${({ theme }) => theme.colors.background};
  width: 100vw;
  height: 100vh;
`

const MainTemplate: React.FC = (props: Props) => {
  return (
    <Container>
      <Header />
    </Container>
  )
}

export default MainTemplate
