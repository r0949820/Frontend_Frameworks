import {FunctionComponent, MouseEventHandler} from 'react'
import IToDoList from '../../models/IToDoList.ts'
import {Button, ListGroupItem} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDeleteList} from '../../api/todo.ts'


const List: FunctionComponent<IToDoList> = ({owner, name, id}) => {
    const navigate = useNavigate()
    const {mutate: deleteList} = useDeleteList()

    const deleteHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
        evt.stopPropagation()
        deleteList({id})
    }

    return (
        <ListGroupItem onClick={() => navigate(id.toString())}>
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex">
                    <h3>{name}</h3>
                </div>
                <div className="d-flex">
                    <Button variant="danger" onClick={deleteHandler}>Delete</Button>
                </div>
            </div>
            <div className="text-muted">Created by {owner?.username}</div>
        </ListGroupItem>
    )
}

export default List