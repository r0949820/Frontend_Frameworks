import {FunctionComponent, ReactNode} from 'react'
import Header from './Header.tsx'
import Row from './Row.tsx'

interface MultiplicationTableProps {
    table: number
}

const MultiplicationTable: FunctionComponent<MultiplicationTableProps> = ({table}) => {

    const output: ReactNode[] = []
    for (let i = 1; i<= 10; i++) {
        output.push(<Row key={i * table} factor1={i} factor2={table}/>)
    }

    return (
        <div className="table">
            <Header table={table}/>
            {output}
        </div>
    )
}

export default MultiplicationTable