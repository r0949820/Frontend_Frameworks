import {FunctionComponent} from 'react'
import MultiplicationTable from './multiplicationTable.tsx'

interface ExerciseOneProps {

}

const ExerciseOne: FunctionComponent<ExerciseOneProps> = () => {
    return (
        <div className="exercise">
            <MultiplicationTable table={9}/>
            <MultiplicationTable table={3}/>
        </div>
    )
}

export default ExerciseOne