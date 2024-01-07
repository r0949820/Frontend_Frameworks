import {FunctionComponent} from 'react'
import MultiplicationTable from './multiplicationTable.tsx'

interface ExerciseOneProps {

}

const ExerciseOne: FunctionComponent<ExerciseOneProps> = () => {
    return (
        <>
            <div className='exercise'>
                <MultiplicationTable table={3} />
                <MultiplicationTable table={9}/>
            </div>
        </>
    )
}

export default ExerciseOne