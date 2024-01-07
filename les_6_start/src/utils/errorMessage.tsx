import {FunctionComponent, PropsWithChildren} from 'react'
import {Alert} from 'react-bootstrap'

const ErrorMessage: FunctionComponent<PropsWithChildren> = ({children}) => {
    // Fix for test 3.
    if (!children) {
        return <></>
    }

    return (
        <Alert variant="danger" data-cy="error-message">
            {children}
        </Alert>
    )
}

export default ErrorMessage
