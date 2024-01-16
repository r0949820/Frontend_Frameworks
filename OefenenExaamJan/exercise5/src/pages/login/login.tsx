import {FormEventHandler, FunctionComponent, useState} from 'react'
import StyledContainer from './styledComponents/styledContainer.tsx'
import {Button, Col, Form, Row} from 'react-bootstrap'
import ResponseMessage from '../../utils/responseMessage.tsx'
import FormSubmitButtonWithLoading from '../../utils/formSubmitButtonWithLoading.tsx'
import {useSignIn, useSignUp} from '../../api/users.ts'
import useRedirectAfterCountdown from '../../hooks/useRedirectAfterCountdown.ts'

const Login: FunctionComponent = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const {
        mutate: signIn,
        isLoading: signingIn,
        isError: isSignInError,
        isSuccess: signedUp,
        error: signInError,
    } = useSignIn()
    const {
        mutate: signUp,
        isLoading: signingUp,
        isError: isSignUpError,
        isSuccess: signedIn,
        error: signUpError,
    } = useSignUp()

    useRedirectAfterCountdown({
        destination: '/',
        enabled: signedUp || signedIn,
    })

    const validEmail = !!email.match(/\w+@\w+\.\w+/)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (isSignUp) {
            signUp({email, password, username})
        } else {
            signIn({email, password})
        }
    }

    return (
        <StyledContainer className={'d-flex flex-column justify-content-center vh-100'}>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} lg={6}>
                    <h1>To-Do</h1>
                    <p>Log in to your existing account or create a new one with a real or fake email-address.</p>
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                <Col xs={6} sm={4} lg={3}>
                    <Button variant={'link'} className="p-0" onClick={() => setIsSignUp(false)}>Sign in</Button>
                </Col>
                <Col xs={6} sm={4} lg={3} className="d-flex justify-content-end">
                    <Button variant={'link'} className="p-0" onClick={() => setIsSignUp(true)}>Sign up</Button>
                </Col>
            </Row>
            <Row className="justify-content-center">

                <Col xs={12} sm={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                          isValid={validEmail}
                                          isInvalid={email !== '' && !validEmail}
                                          value={email} required
                                          onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>

                        {isSignUp && (
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter a username"
                                              value={username} required
                                              isInvalid={username.length < 3 && username !== ''}
                                              isValid={username.length >= 3}
                                              onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"
                                          min={6}
                                          isInvalid={password.length < 6 && password !== ''}
                                          isValid={password.length >= 6}
                                          value={password} required
                                          onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>

                        {isSignUp && (
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm your password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password again"
                                              value={passwordConfirmation} required
                                              isInvalid={(passwordConfirmation !== password || password.length < 6) && password !== ''}
                                              isValid={passwordConfirmation === password && password !== ''}
                                              onChange={e => setPasswordConfirmation(e.target.value)}/>
                            </Form.Group>
                        )}

                        <ResponseMessage success={signedUp || signedIn || null}
                                         successText={`You've successfully singed ${isSignUp ? 'up' : 'in'}, you'll be redirected soon.`}
                                         failureText={isSignInError && signInError?.message || isSignUpError && signUpError?.message}/>

                        <FormSubmitButtonWithLoading loading={signingIn || signingUp}
                                                     loadingText={isSignUp ? 'Creating your account...' : 'Logging in ...'}
                                                     text={isSignUp ? 'Sign up' : 'Log in'}/>

                    </Form>

                </Col>
            </Row>
        </StyledContainer>
    )
}

export default Login
