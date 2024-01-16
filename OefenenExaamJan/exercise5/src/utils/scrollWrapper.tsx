import {FunctionComponent, PropsWithChildren} from 'react'
import styled from 'styled-components'

interface ScrollWrapperProps {
    height?: number
}

const StyledScrollWrapper= styled.div<ScrollWrapperProps>`
  overflow-x: hidden;
  overflow-y: scroll;
  height: ${props => props.height ? `${props.height}dvh` : '100dvh'}
`

const ScrollWrapper: FunctionComponent<PropsWithChildren & ScrollWrapperProps> = ({children, height}) => {
    return (
        <StyledScrollWrapper height={height}>
            {children}
        </StyledScrollWrapper>
    )
}

export default ScrollWrapper
