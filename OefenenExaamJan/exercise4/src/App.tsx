import SettingContext from './context/settingContext.tsx'
import {Suspense, useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import StyledContainerWrapper from './components/styledContainerWrapper.tsx'
import {Container} from 'react-bootstrap'
import Routing from './navigation/routing.tsx'
import LoadingPage from './utils/loadingPage.tsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD,
      suspense: true,
      useErrorBoundary: false,
    }
  }
})

function App() {
const [darkTheme, setDarkTheme] = useState<boolean>(true)
  const [refetchInterval, setRefetchInterval] = useState<number>(300000)

  return (
    <SettingContext.Provider value={{darkTheme, setRefetchInterval, refetchInterval, toggleDarkTheme: () => setDarkTheme(x => !x)}}>
      <QueryClientProvider client={queryClient}>
        <StyledContainerWrapper $darkTheme={darkTheme}>
          <Container className="mt-2">
            <Suspense fallback={<LoadingPage/>}>
              <Routing/>
            </Suspense>
          </Container>
        </StyledContainerWrapper>
      </QueryClientProvider>
    </SettingContext.Provider>
  )
}

export default App
