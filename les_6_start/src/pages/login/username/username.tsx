import {FormEvent, FunctionComponent, useState} from 'react'
import {useGetProfile, useUpsertProfile} from '../../../API/users.ts'
import {Navigate} from 'react-router-dom'
import StyledContainer from '../styledComponents/styledContainer.tsx'
import {Col, Form, Row} from 'react-bootstrap'
import ResponseMessage from '../../../utils/responseMessage.tsx'
import FormSubmitButtonWithLoading from '../../../utils/formSubmitButtonWithLoading.tsx'


const Username: FunctionComponent = () => {
    const [username, setUsername] = useState<string>('')
    const profileMutation = useUpsertProfile()
    const {data: profile} = useGetProfile()

    if (profile?.username && profile?.username !== '') {
        return <Navigate to="/"/>
    }

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.currentTarget.blur()
        profileMutation.mutate({username})
    }

    const successMessage = (
        <span>
            You've successfully updated your username. You can now use the site!&nbsp;
            You'll be redirected automatically.
        </span>
    )

    const failureMessage = <span>We were unable to update your username, please try again.</span>

    return (
        <StyledContainer className={'d-flex flex-column justify-content-center vh-100'}>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} lg={6}>
                    <Form onSubmit={submitForm} className={'mt-5'}>
                        <h1>Update username</h1>

                        <p>
                            A username is required to use this site, this is the name by which other users will
                            be able to identify you.
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label>Choose your username</Form.Label>
                            <Form.Control type="text" required
                                          placeholder="Username"
                                          value={username}
                                          onChange={evt => setUsername(evt.target.value)}/>
                        </Form.Group>


                        <ResponseMessage success={profileMutation.isSuccess}
                                         show={!profileMutation.isIdle && !profileMutation.isLoading}
                                         successText={successMessage}
                                         failureText={failureMessage}/>


                        <FormSubmitButtonWithLoading text={'Update username'}
                                                     loadingText={'Updating username...'}
                                                     loading={profileMutation.isLoading}/>
                    </Form>
                </Col>
            </Row>

        </StyledContainer>
    )
}

export default Username
