import {FunctionComponent} from 'react'
import {Button, Col, Container, ListGroup, Row} from 'react-bootstrap'

interface GroupDetailsProps {

}

const GroupDetails: FunctionComponent<GroupDetailsProps> = () => {

    const editUserBtn = (
        <div className="d-grid">
            <Button className={'my-2'}>
                Add or delete group members
            </Button>
        </div>
    )

    return (
        <Container fluid  className="pe-0">
            <Row className="pt-4 mx-1">
                <Col sm={12}>
                    Title
                    <p><i>Description</i></p>

                    <div className="d-grid">
                        <Button className={'my-2'}>
                            New Post
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="mx-1">
                <Col sm={8}>
                    <h3>Posts</h3>

                </Col>
                <Col sm={4} className="text-end">
                    <h3>Group members</h3>
                    editUserBtn
                    <ListGroup className="text-start">
                    </ListGroup>
                </Col>
            </Row>

        </Container>
    )
}

export default GroupDetails
