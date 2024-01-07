import {FunctionComponent} from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar.tsx'

const ExerciseThreeContainer = styled.div`
  flex-direction: column;
`

interface ExerciseThreeProps {

}

const ExerciseThree: FunctionComponent<ExerciseThreeProps> = () => {
    return (
        <ExerciseThreeContainer className="exercise">
            <ProgressBar percentage={75} color={'#ce4b99'}/>
            <ProgressBar percentage={15} color={'#ce1b29'}/>
            <ProgressBar percentage={65} color={'#125b69'}/>
        </ExerciseThreeContainer>
    )
}

export default ExerciseThree