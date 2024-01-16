import {FormEventHandler, FunctionComponent, useEffect, useRef, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import FormSubmitButtonWithLoading from '../../../utils/formSubmitButtonWithLoading.tsx'
import {useCreateTask} from '../../../api/todo.ts'
import {useParams} from 'react-router-dom'

interface TaskFormProps {

}

const TaskForm: FunctionComponent<TaskFormProps> = () => {
    const {listId} = useParams()
    const [name, setName] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const {mutate: createTask, isLoading} = useCreateTask()
    const nameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (deadline === '' && name === '') {
            nameRef?.current?.focus()
        }
    }, [deadline, name])

    const submitHandler: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault()
        createTask({
            name,
            deadline: new Date(deadline),
            toDoListId: Number(listId),
        })
        setName('')
        setDeadline('')
    }

    return (
        <>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          ref={nameRef}
                                          value={name}
                                          onChange={(evt) => setName(evt.target.value)}
                                          placeholder="Task name"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="datetime-local" value={deadline}
                                          onChange={(evt) => setDeadline(evt.target.value)}
                                          placeholder="Deadline"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <FormSubmitButtonWithLoading loading={isLoading} text={'Create Task'}
                                                 loadingText={'Creating task ...'}/>
                </Row>
            </Form>
        </>
    )
}

export default TaskForm