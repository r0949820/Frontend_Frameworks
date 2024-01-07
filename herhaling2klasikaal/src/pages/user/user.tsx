import {ChangeEventHandler, FormEventHandler, FunctionComponent} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import ResponseMessage from '../../utils/responseMessage.tsx'
import Avatar from '../../utils/avatar.tsx'
import FormSubmitButtonWithLoading from '../../utils/formSubmitButtonWithLoading.tsx'
import BootstrapIcon from '../../utils/bootstrapIcon.tsx'

interface UserProps {

}

const User: FunctionComponent<UserProps> = () => {
    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    }

    const avatarChange: ChangeEventHandler<HTMLInputElement> = (evt) => {

    }

    return (
        <Row className="mt-4">
            <Col>
                <h2>Welcome USERNAME</h2>
                <ResponseMessage success={null}
                                 successText={'Profile updated'}
                                 failureText={'TO COMPLETE'}/>
            </Col>

            <Form onSubmit={handleFormSubmit}>
                <Row className="mt-4">
                    <Col xs={6} className="d-flex align-items-center justify-content-center">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label><Avatar src={''}/></Form.Label>
                            <Form.Control type="file" className="d-none"
                                          onChange={avatarChange}/>
                        </Form.Group>

                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control type="text" placeholder="First name"/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"/>
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <FormSubmitButtonWithLoading loading={false} text={'Save changes'}
                                                     loadingText={'Saving changes'}/>
                    </Col>

                    <Col xs={12} className="mt-4">
                        <div className="d-grid">
                            <Button variant="danger">
                                <BootstrapIcon iconName={'box-arrow-right'}/>Log out
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}

export default User
