import {FormEventHandler, FunctionComponent, Suspense, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import FormSubmitButtonWithLoading from '../../utils/formSubmitButtonWithLoading.tsx'
import {useCreateList} from '../../api/todo.ts'
import UserList from './userList.tsx'
import LoadingPart from '../../utils/loadingPart.tsx'
import {Navigate} from 'react-router-dom'

const Home: FunctionComponent = () => {
    const [name, setName] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)
    const {mutate: createList, isLoading, data: newList} = useCreateList()
    const [sharedUsers, setSharedUsers] = useState<Set<string>>(new Set())

    if (newList?.id) {
        return <Navigate to={`/list/${newList?.id}`}/>
    }

    const toggleUser = (userId: string) => {
        setSharedUsers(old => {
            const newUsers = new Set(old)
            newUsers.has(userId) ? newUsers.delete(userId) : newUsers.add(userId)
            return newUsers
        })
    }

    const submitHandler: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault()
        createList({name, isPrivate, sharedUsers: Array.from(sharedUsers)})
        setName('')
        setIsPrivate(false)
        setSharedUsers(new Set())
    }

    const listForm = (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>To-Do List name</Form.Label>
                <Form.Control type="text" placeholder="Name"
                              value={name} onChange={evt => setName(evt.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(x => !x)}
                    label="Is Private"/>
            </Form.Group>

            <FormSubmitButtonWithLoading loading={isLoading} text={'Create To-Do list'}
                                         loadingText={'Creating To-Do list ... '}/>
        </Form>
    )

    return (
        <>
            <h1>New To-Do list</h1>

            <Row>
                <Col>
                    {listForm}
                </Col>

                <Col>
                    {isPrivate && <Col>
                        <Suspense fallback={<LoadingPart/>}>
                            <UserList sharedUsers={sharedUsers} toggleUser={toggleUser}/>
                        </Suspense>
                    </Col>}
                </Col>
            </Row>
        </>
    )
}

export default Home
