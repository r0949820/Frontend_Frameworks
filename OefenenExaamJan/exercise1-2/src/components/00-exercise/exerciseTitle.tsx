import {FunctionComponent} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'
import ChevronBtn from './chevronBtn.tsx'

interface ExerciseTitleProps {
    title: string
    isOpen: boolean
    toggleIsOpen: () => void
}

const StyleContainer = styled.div`
    font-family: "Lucida Sans", Monaco, monospace;
    font-size: 3rem;
    letter-spacing: 3px;
    color: #3A5D9B;
    font-weight: 300;
    font-style: oblique;
    line-height: 1.2;
`

const ExerciseTitle: FunctionComponent<ExerciseTitleProps> = ({title, isOpen, toggleIsOpen}) => {
    return (
        <StyleContainer>
            <ChevronBtn onClick={toggleIsOpen}>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown}/>
            </ChevronBtn>
            {title}
        </StyleContainer>
    )
}

export default ExerciseTitle