import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import PageLoader from './components/PageLoader/PageLoader'
import Navigation from './navigation/Navigation'
import { darkTheme } from './theme/theme'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-display: swap;
    font-family: 'Kanit', 'sans-serif';
    font-size: 100%;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  body {
    overflow: hidden;
  }

  .anticon {
    font-size: 1.25rem;
  }
`

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
          <Helmet>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {isLoading && <PageLoader />}
          <Navigation />
          <GlobalStyle />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
