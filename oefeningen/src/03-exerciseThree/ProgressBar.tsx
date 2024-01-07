import {FunctionComponent} from 'react'
import Bar from './bar.tsx'
import Label from './label.tsx'

interface ProgressBarProps {
    percentage: number
    color: string
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({percentage, color}) => {
    return (
        <>
            <svg height="80" width="400">

                <Bar percentage={100} color={'lightgrey'}/>
                <Bar percentage={percentage} color={color}/>
                <Label percentage={percentage} color={color}/>
            </svg>

        </>
    )
}

export default ProgressBar