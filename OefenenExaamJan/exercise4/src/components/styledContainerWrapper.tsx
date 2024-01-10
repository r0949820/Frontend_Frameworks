import styled from 'styled-components'

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


export default StyledContainerWrapper