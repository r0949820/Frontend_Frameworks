import {FunctionComponent} from 'react'
import IToDoList from '../../models/IToDoList.ts'
import {ListGroup} from 'react-bootstrap'
import List from './list.tsx'

interface ListsOverviewProps {
    lists: IToDoList[]

}

const ListsOverview: FunctionComponent<ListsOverviewProps> = ({lists}) => {
    if (lists.length === 0) {
        return <div>No lists found</div>
    }

    return (
        <ListGroup>
            {lists?.map(l => <List { ... l} key={l.id}/>)}
        </ListGroup>
    )
}

export default ListsOverview