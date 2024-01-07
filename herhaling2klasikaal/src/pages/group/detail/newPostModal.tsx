import {FunctionComponent} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

interface NewPostModalProps {

}

const NewPostModal: FunctionComponent<NewPostModalProps> = () => {
    const closeHandler = () => {
    }

    const createPostHandler = async () => {
        closeHandler()
    }

    return (
        <Modal show={true} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New post content</Form.Label>
                    <Form.Control as="textarea" required rows={3}/>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">
                    Create Post
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewPostModal
