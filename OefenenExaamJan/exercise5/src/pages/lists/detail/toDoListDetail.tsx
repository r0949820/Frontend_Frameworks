import {FunctionComponent} from 'react'
import {useParams} from 'react-router-dom'
import {useGetList, useGetTasksForList} from '../../../api/todo.ts'
import TaskForm from './taskForm.tsx'
import TaskItem from './taskItem.tsx'
import {ListGroup} from 'react-bootstrap'

interface ToDoListDetailProps {

}

const ToDoListDetail: FunctionComponent<ToDoListDetailProps> = () => {
    const {listId} = useParams()
    const {data: list} = useGetList(Number(listId))
    const {data: tasks} = useGetTasksForList(Number(listId))

    return (
        <>
            <h1>{list?.name}</h1>
            <div className="text-muted">Created by {list?.owner?.username}</div>
            <hr/>

            <TaskForm/>

            <ListGroup className="mt-4">
                {tasks?.map(t => (
                    <TaskItem { ... t}  key={t.id}/>
                ))}
            </ListGroup>

        </>
    )
}

export default ToDoListDetail