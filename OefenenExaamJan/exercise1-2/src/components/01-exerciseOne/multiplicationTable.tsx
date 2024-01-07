import {FunctionComponent, ReactNode} from 'react'
import Header from './header.tsx'
import Row from './row.tsx'

interface MultiplicationTableProps {
    table:number;
}


const MultiplicationTable: FunctionComponent<MultiplicationTableProps> = ({table}) => {
    const output: ReactNode[] = []
    for (let i = 1; i <= 10; i++) {
        output.push(<Row key={i} factor1={i} factor2={table}/>)
    }

    return (
        <div className="table">
            <Header table={table}/>
            {output}
        </div>
    )
}

export default MultiplicationTable