import {FunctionComponent} from 'react'
import {IProfile} from '../../../models/IProfile.ts'
import Avatar from '../../../utils/avatar.tsx'
import {Col, Container, Form, Table} from 'react-bootstrap'
import StyledRow from '../../../utils/styledRow.tsx'

interface EditMembersProps {

}

const EditMembers: FunctionComponent<EditMembersProps> = () => {
    const isMember = (userId: string) => {
        return false
    }

    const addOrRemoveUser = (add: boolean, userId: string) => {
    }

    const userRow = (profile: IProfile) => {
        const userIsMember = isMember(profile.id)
        return (
            <tr key={profile.id}>
                <td>
                    <Avatar src={profile.avatar}/> USERNAME
                </td>
                <td onClick={() => addOrRemoveUser(!userIsMember, profile.id)}>{userIsMember ? '- Remove' : '+ Add'}</td>
            </tr>
        )
    }

    return (
        <Container fluid>
            <StyledRow className="pt-4 mx-1">
                <Col sm={12}>

                    <h3>Edit group members</h3>

                    <Form.Group className="mb-3 mt-4">
                        <Form.Control required placeholder="Username"/>
                    </Form.Group>
                </Col>


                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Add/Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </StyledRow>


        </Container>
    )
}

export default EditMembers
