import {FunctionComponent, useState} from 'react'
import SettingContext from './context/settingContext.ts'
import {Container} from 'react-bootstrap'
import styled from "styled-components";
import Home from './pages/home.tsx'

interface AppProps {

}

interface StyledContainerWrapperProps {
    $darkTheme: boolean
}

const StyledContainerWrapper = styled.div<StyledContainerWrapperProps>`  
  background-color: ${props => props.$darkTheme ? '#1d2025' : 'white'};
  color: ${props => props.$darkTheme ? '#688f9e': 'black'} !important;
  a, .card-title {
    color: ${props => props.$darkTheme ? '#688f9e' : 'black'} !important;
  }
  button {
    color: ${props => props.$darkTheme ? '#688f9e' : 'black'};
  }
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
`


const App: FunctionComponent<AppProps> = () => {
    const [darkTheme, setDarkTheme] = useState<boolean>(true)
    const [refetchInterval, setRefetchInterval] = useState<number>(1000 * 60 * 5)

    return (
        <SettingContext.Provider value={{
            darkTheme,
            setDarkTheme: () => _setDarkTheme(x => !x),
            refetchInterval,
            setRefetchInterval
        }}>
            <StyledContainerWrapper $darkTheme={darkTheme}>
                <Container>
                    <Home/>
                </Container>
            </StyledContainerWrapper>
        </SettingContext.Provider>
    )
}

export default App
