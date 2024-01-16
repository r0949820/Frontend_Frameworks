import {FunctionComponent} from 'react'
import Computer from './computer.tsx'
import {Row} from 'react-bootstrap'
import IComputer from '../../../models/IComputer.ts'


interface ComputerListProps {
    computers: IComputer[]
}

const ComputerList: FunctionComponent<ComputerListProps> = ({computers}) => {
    return (
        <Row>
            {computers.map(c => <Computer { ... c} key={c.id}/>)}
        </Row>
    )
}

export default ComputerList