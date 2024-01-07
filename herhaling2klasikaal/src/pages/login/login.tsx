import {FormEventHandler, FunctionComponent} from 'react'
import FormSubmitButtonWithLoading from '../../utils/formSubmitButtonWithLoading.tsx'
import ResponseMessage from '../../utils/responseMessage.tsx'
import {Col, Container, Form, Row} from 'react-bootstrap'
import styled from 'styled-components'

const NoStyleButton = styled.button`
  background: inherit;
  color: inherit;
  border: none;

  &:focus {
    outline: none;
  }
`

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    const isNewAccount = false

    const loginOrRegister: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault()

        
    }

    const usernameForm = (
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" required placeholder="Enter username"/>
        </Form.Group>
    )

    const successText = `You've successfully signed ${isNewAccount ? 'up' : 'in'}, you'll be redirected soon.`

    return (
        <Container className="d-flex flex-column vh-100">
            <Row className="justify-content-center pt-5">
                <Col xs={12} sm={8}>
                    <h1>Social network</h1>
                    <hr/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} sm={8}>

                    <Row className="mb-3">
                        <Col xs={6} className={!isNewAccount ? '' : 'text-secondary'}>
                            <NoStyleButton>
                                <h4>Sign in</h4>
                            </NoStyleButton>
                        </Col>
                        <Col xs={6} className={`${isNewAccount ? '' : 'text-secondary'} d-flex justify-content-end`}>
                            <NoStyleButton>
                                <h4>Create a new account</h4>
                            </NoStyleButton>
                        </Col>
                    </Row>

                    <Row>
                        <Form onSubmit={loginOrRegister}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" required placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required placeholder="Enter password"/>
                            </Form.Group>

                            {isNewAccount && usernameForm}

                            <ResponseMessage success={null}
                                             successText={successText}
                                             failureText={'TO COMPLETE'}/>

                            <FormSubmitButtonWithLoading
                                loadingText={false ? 'Creating an account for you' : 'Logging in ...'}
                                loading={false}
                                text={isNewAccount ? 'Register account' : 'Log in'}/>
                        </Form>

                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

export default Login
