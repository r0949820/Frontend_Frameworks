import styled from 'styled-components'

interface StyledTabsWrapperProps {
    $darkTheme: boolean
}

const StyledTabsWrapper = styled.div<StyledTabsWrapperProps>`
  background-color: ${props => props.$darkTheme ? '#1d2025' : 'white'};

  ul > li > button, li {
    background-color: ${props => props.$darkTheme ? '#1d2025' : 'white'} !important;
    border-bottom: 1px solid ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
  }

  ul > li > button:hover, ul > li > button.active, ul > li > button:active, ul > li > button:focus {
    border: 1px solid ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
    color: ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
  }

  ul {
    border-bottom: 2px solid ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
  }
`


export default StyledTabsWrapper