import {FunctionComponent} from 'react'

interface BarProps {
    percentage: number
    color: string
}

const Bar: FunctionComponent<BarProps> = ({percentage, color}) => {
    return (
        <>
            <g fill="none" stroke={color} strokeWidth="25">
                <path strokeLinecap="round" d={`M20 55 l${percentage/100 * 360} 0`} />
            </g>
        </>
    )
}

export default Bar