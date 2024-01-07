import {FormEventHandler, FunctionComponent} from 'react'
import {Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import ResponseMessage from '../../utils/responseMessage.tsx'
import FormSubmitButtonWithLoading from '../../utils/formSubmitButtonWithLoading.tsx'

interface CreateGroupProps {

}

const CreateGroup: FunctionComponent<CreateGroupProps> = () => {
    const successMessage = (id: string) => (
        <span>
            You've successfully created a new group, you'll be redirected soon, or you can
            click <Link to={id}>here</Link>.
        </span>
    )

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <h1>Create a new group</h1>

            <ResponseMessage success={null}
                             successText={'TO COMPLETE'}
                             failureText={'TO COMPLETE'}/>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={10}
                              placeholder={'Please add a description for your group here, it should mention the purpose of the group.'}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="This is a private group"/>
            </Form.Group>

            <FormSubmitButtonWithLoading loading={false} text="Create group" loadingText="Creating group..."/>

        </Form>
    )
}

export default CreateGroup
