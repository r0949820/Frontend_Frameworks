import {FunctionComponent} from 'react'
import {Button, Card, Col, Form} from 'react-bootstrap'

interface CommentProps {

}

const Comment: FunctionComponent<CommentProps> = () => {
    const deleteDelete = (
        <>
            &nbsp; | <Button variant="link" className="text-light p-0">Delete</Button>
        </>
    )

    const loadCommentsBtn = (
        <>
            &nbsp; | <Button variant="link" className="text-light p-0">
            Load comments
        </Button>
        </>
    )

    const replyForm = (
        <Col sm={12} className="mx-1 mt-2 d-grid">
            <Form.Group className="mb-3">
                <Form.Control placeholder="New comment" as="textarea" rows={3}/>
            </Form.Group>
            <Button variant="primary">Place comment</Button>
            <Button variant="primary" className="mt-2">Cancel</Button>
        </Col>
    )

    return (
        <Card bg="secondary" text="light" className="ms-2 my-2 border border-1">
            <Card.Body>
                <div className="d-flex">
                    <div className="align-self-start me-3">
                        {/*<Avatar src={user?.avatar}/>*/}
                    </div>
                    <div className="flex-grow-1 align-self-center">
                        <div className="flex-grow-1">
                            {/*<h6>By {user?.username} at {createdAt.toLocaleString()}</h6>*/}
                        </div>
                        <div className="d-grid">
                            {/*<p>{content}</p>*/}
                        </div>
                        <div>
                            <Button variant="link" className="text-light p-0" >
                                {false ? 'Hide reply form' : 'Reply'}
                            </Button>
                        </div>
                    </div>
                </div>

            </Card.Body>

        </Card>
    )
}

export default Comment
