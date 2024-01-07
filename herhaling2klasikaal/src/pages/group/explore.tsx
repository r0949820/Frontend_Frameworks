import {FunctionComponent} from 'react'
import {Form} from 'react-bootstrap'

interface ExploreProps {

}

const Explore: FunctionComponent<ExploreProps> = () => {
    return (
        <>
            <Form.Group className="mb-5 mt-4">
                <Form.Control type="text" placeholder="Group name"/>
            </Form.Group>
        </>
    )
}

export default Explore
