import {FunctionComponent} from 'react'

interface LabelProps {
    score:number;
}

const Label: FunctionComponent<LabelProps> = ({score}) => {
    let label = 'Excellent'
    if (score < 0.1) label = 'Disaster'
    else if (score <= 0.3) label = 'Insufficient'
    else if (score <= 0.5) label = 'Sufficient'
    else if (score <= 0.6) label = 'Average'
    else if (score <= 0.8) label = 'Good'
    else if (score <= 0.9) label = 'Very good'

    return (
        <div>
            {label}
        </div>
    )
}

export default Label