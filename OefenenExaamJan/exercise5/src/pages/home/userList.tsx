import {FunctionComponent} from 'react'
import {Form, ListGroup} from 'react-bootstrap'
import useIsEditing from '../../hooks/useIsEditing.ts'
import {useGetProfiles} from '../../api/users.ts'
import ScrollWrapper from '../../utils/scrollWrapper.tsx'


interface UserListProps {
    sharedUsers: Set<string>
    toggleUser: (userId: string) => void
}

const UserList: FunctionComponent<UserListProps> = ({sharedUsers, toggleUser}) => {
    const [username, setUsername, isEdeting] = useIsEditing({})
    const {data: users} = useGetProfiles(username, !isEdeting)

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Share with users</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username}
                                  onChange={(evt) => setUsername(evt.target.value)}/>
                    <Form.Text className="text-muted">
                        Click a user to select them.
                    </Form.Text>
                </Form.Group>
            </Form>

            <ScrollWrapper height={35}>
            <ListGroup>
                {users?.map(user => (
                    <ListGroup.Item key={user.id} action active={sharedUsers.has(user.id)}
                                    onClick={() => toggleUser(user.id)}>
                        {user.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            </ScrollWrapper>
        </>
    )
}

export default UserList