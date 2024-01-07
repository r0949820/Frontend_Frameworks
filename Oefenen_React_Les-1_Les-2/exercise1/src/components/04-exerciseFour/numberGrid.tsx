import {FunctionComponent, ReactNode} from 'react'

interface NumberGridProps {
    n:number
}

const NumberGrid: FunctionComponent<NumberGridProps> = ({n}) => {

    const output: ReactNode[] = []
    for (let i = 0; i < n; i++) {
        const row: ReactNode[] = []
        for (let j = 0; j < n; j++) {
            row.push(<button key={i * n + j + 1} className='square'>{i * n + j + 1}</button>)
        }
        output.push(<div key={i} className='grid-row'>{row}</div>)
    }

    return (
        <div className='grid'>
            {output}
        </div>
    )
}

export default NumberGrid