import {FunctionComponent} from 'react'

interface LabelProps {
    percentage: number
    color: string
}

const Label: FunctionComponent<LabelProps> = ({percentage,color}) => {
    return (
        <>
            <text x="180" y="25" fill={color}>
                {percentage} %
            </text>
        </>
    )
}

export default Label