import {FunctionComponent} from 'react'
import ITask from '../../../models/ITask.ts'
import {Button, ListGroupItem} from 'react-bootstrap'
import useCountdown from '../../../hooks/useCountdown.ts'
import {useDeleteTask, useUpdateTask} from '../../../api/todo.ts'
import {useGetProfile} from '../../../api/users.ts'

const TaskItem: FunctionComponent<ITask> = (oldTask) => {
    const {id, name, complete, deadline, createdBy, completedBy, toDoListId} = oldTask
    const countDown = useCountdown(deadline)
    const {mutate: updateTask} = useUpdateTask()
    const {data: profile} = useGetProfile()
    const {mutate: deleteTask} = useDeleteTask()

    const createdById = typeof createdBy === 'string' ? createdBy : createdBy?.id

    const toggleComplete = () => {
        updateTask({
            updatedTask: {
                ...oldTask,
                complete: !oldTask.complete,
                completedBy: !oldTask.complete ? profile?.username : null,
            },
        })
    }

    const deleteBtn = (
        <div className={'d-grid mt-2'}>
            <Button variant="danger" onClick={() => deleteTask({id, toDoListId})}>
                Delete task
            </Button>
        </div>
    )

    return (
        <ListGroupItem className={'d-flex flex-column'}>
            <div className={'d-flex flex-row'}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold fs-3" style={{height: '1em'}}>
                        <div>{name}</div>
                    </div>
                    <div className={'text-muted mt-3'}>
                        {!complete && <div style={{height: '1em'}}>Time remaining: {countDown}</div>}
                        Created by {typeof createdBy === 'string' ? createdBy : createdBy?.username}
                    </div>
                </div>
                <div className={'flex-grow-1'}/>
                <div className="ms-2 me-auto d-flex flex-column align-items-end">
                    <Button variant="link" onClick={toggleComplete}
                            className="fw-bold fs-3 text-decoration-none" style={{height: '2em'}}>
                        {complete ? <span>&#x1F5F9;</span> : <span>&#x2610;</span>}
                    </Button>
                    <div className={'text-muted'}>
                        {complete ? <span>Completed by {typeof completedBy === 'string' ? completedBy : completedBy?.username}
                        </span> : <></>}
                        <div/>
                    </div>
                </div>
            </div>
            <div>
                {createdById === profile?.id && deleteBtn}
            </div>
        </ListGroupItem>
    )
}

export default TaskItem
