import React, { useLayoutEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import PageLoader from '_components/PageLoader/PageLoader'
import { HeroesContextProvider } from '_context/HeroesContext'
import Navigation from '_navigation/Navigation'
import { darkTheme } from '_theme/theme'

const queryClient = new QueryClient()

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider theme={darkTheme}>
          <HeroesContextProvider>
            <Helmet>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;500&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            {isLoading && <PageLoader />}
            <Navigation />
            <GlobalStyle />
          </HeroesContextProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
   
    font-family: 'Kanit', 'sans-serif';
    font-size: 100%;
    font-weight: 300;
    margin: 0;
    padding: 0;
  }



  body {
    font-display: swap;
    overflow: hidden;
  }

  .anticon {
    font-size: 1.25rem;
  }
`
