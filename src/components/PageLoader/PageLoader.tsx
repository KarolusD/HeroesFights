import React, { useContext } from 'react'
import Loader from 'react-loader-spinner'
import styled, { ThemeContext } from 'styled-components'


const PageLoader = () => {
  const theme = useContext(ThemeContext)

  return (
    <LoaderCointainer>
      <Loader
        color={theme.colors.violet}
        type="BallTriangle"
        height={180}
        width={180}
      />
    </LoaderCointainer>
  )
}

export default PageLoader

const LoaderCointainer = styled.div`
  align-items: center;
  background: ${({ theme }) => `${theme.colors.background}DE`};
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 999;
`
