import {FunctionComponent} from 'react'
import styled from 'styled-components'

const TitleContainer = styled.div`
  font-family: "Lucida Sans", Monaco, monospace;
  font-size: 3rem;
  letter-spacing: 3px;
  color: #3A5D9B;
  font-weight: 300;
  font-style: oblique;
  line-height: 1.2;
`

interface ExerciseTitleProps {
    title: string
}

const ExerciseTitle: FunctionComponent<ExerciseTitleProps> = ({title}) => {
    return (
        <TitleContainer>
            {title}
        </TitleContainer>
    )
}

export default ExerciseTitle