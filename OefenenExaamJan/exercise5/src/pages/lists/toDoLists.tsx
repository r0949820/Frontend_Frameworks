import {FunctionComponent} from 'react'
import {useGetLists} from '../../api/todo.ts'
import {useGetProfile} from '../../api/users.ts'
import {Tab, Tabs} from 'react-bootstrap'
import ListsOverview from './listsOverview.tsx'

interface ToDoListsProps {

}

const ToDoLists: FunctionComponent<ToDoListsProps> = () => {
    const {data: lists} = useGetLists()
    const {data: user} = useGetProfile()

    const myLists = lists?.filter(list => list.ownerId === user?.id)
    const sharedLists = lists?.filter(list => list.isPrivate && list.ownerId !== user?.id)
    const publicLists = lists?.filter(list => !list.isPrivate)

    return (
        <>
            <Tabs defaultActiveKey="myLists" className="mb-3">
                <Tab eventKey="myLists" title="My lists">
                    <ListsOverview lists={myLists ?? []} />
                </Tab>
                <Tab eventKey="sharedLists" title="Shared with me">
                    <ListsOverview lists={sharedLists ?? []} />
                </Tab>
                <Tab eventKey="public" title="Public lists">
                    <ListsOverview lists={publicLists ?? []} />
                </Tab>
            </Tabs>
        </>
    )
}

export default ToDoLists