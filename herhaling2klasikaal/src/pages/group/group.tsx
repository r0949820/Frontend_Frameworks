import {FunctionComponent} from 'react'
import {Col, Nav, Tab} from 'react-bootstrap'
import StyledRow from '../../utils/styledRow.tsx'
import FixedCol from '../../utils/fixedCol.tsx'

interface GroupProps {

}

const Group: FunctionComponent<GroupProps> = () => {

    return (
        <Tab.Container >
            <StyledRow className="vh-100">
                <Col className="pt-4" sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="my-feed">
                            <h2>No recent activity in any groups.</h2>
                        </Tab.Pane>
                        <Tab.Pane eventKey="my-groups">
                            <h2>My Groups</h2>
                            <hr/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="group-search">
                            <h2>Explore Groups</h2>
                            <hr/>
                            <h5 className="text-muted">Search for a group to join!</h5>
                        </Tab.Pane>
                        <Tab.Pane eventKey="create-group">
                        </Tab.Pane>
                    </Tab.Content>
                </Col>

                <FixedCol sm={2} className="pt-5 border-start border-secondary">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="my-feed">My Feed</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="my-groups">My Groups</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="group-search">Explore Groups</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="create-group">Create Group</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </FixedCol>
            </StyledRow>
        </Tab.Container>
    )
}

export default Group
