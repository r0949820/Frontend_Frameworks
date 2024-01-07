import {FunctionComponent, ReactNode} from 'react'
import {Alert} from 'react-bootstrap'

interface ResponseMessageProps {
    show: boolean
    success: boolean | null
    successText: string | ReactNode
    failureText: string | ReactNode
}

const ResponseMessage: FunctionComponent<ResponseMessageProps> = ({success, successText, failureText, show}) => {
    if (success === null || !show) {
        return <></>
    }

    if (success) {
        return (
            <Alert variant={'success'} data-cy="success-message">
                {successText}
            </Alert>
        )
    } else {
        return (
            <Alert variant={'warning'} data-cy="error-message">
                {failureText}
            </Alert>
        )
    }
}

export default ResponseMessage
