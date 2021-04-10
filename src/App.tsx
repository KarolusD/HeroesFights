import React, { Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { darkTheme } from './theme/theme'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Navigation from './navigation/Navigation'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Kanit', 'sans-serif';
    font-size: 100%;
    margin: 0;
    padding: 0;
  }

  .anticon {
    font-size: 1.25rem;
  }
`

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkTheme}>
        <Fragment>
          <Helmet>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <Navigation />
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
