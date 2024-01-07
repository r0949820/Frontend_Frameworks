import {CSSProperties, FunctionComponent, PropsWithChildren} from 'react'
import ExerciseTitle from './exerciseTitle.tsx'


interface ExerciseProps extends PropsWithChildren {
    title: string
    background?: string
    isOpen: boolean
    toggleIsOpen: () => void
}

const Exercise: FunctionComponent<ExerciseProps> = ({title, background, children, isOpen, toggleIsOpen}) => {
    const style: CSSProperties = {
        boxShadow: '7px 2px 8px 1px rgba(18,89,46,0.67)',
        background: background ?? '#EEEEEE',
        minHeight: '7em',
        padding: '.5em',
        margin: '1.5em .5em'
    }

    return (
        <div style={style}>
            <ExerciseTitle title={title} isOpen={isOpen} toggleIsOpen={toggleIsOpen}/>
            {isOpen && children}
        </div>
    )
}

export default Exercise