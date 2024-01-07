import {FunctionComponent} from 'react'

interface RowProps {
    factor1: number;
    factor2: number;
}

const Row: FunctionComponent<RowProps> = ({factor1, factor2}) => {
    return (
        <div className="row">
            {factor1} X {factor2} = {factor1 * factor2}
        </div>
    )
}

export default Row