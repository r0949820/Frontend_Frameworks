import {FunctionComponent} from 'react'
import Rater from './Rater.tsx'

interface ExerciseTwoProps {

}

const ExerciseTwo: FunctionComponent<ExerciseTwoProps> = () => {
    return (
        <div className="exercise">
            <Rater max={8} rating={7}/>
            <Rater max={5} rating={1}/>
            <Rater max={3} rating={3}/>
        </div>
    )
}

export default ExerciseTwo