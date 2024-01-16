import {FunctionComponent, ReactNode} from 'react'
import {Alert} from 'react-bootstrap'

interface ResponseMessageProps {
    success: boolean | null
    successText: string | ReactNode
    failureText: string | ReactNode
}

const ResponseMessage: FunctionComponent<ResponseMessageProps> = ({success, successText, failureText}) => {
    if (success === null) {
        return <></>
    }

    if (success) {
        return (
            <Alert variant={'success'}>
                {successText}
            </Alert>
        )
    } else {
        return (
            <Alert variant={'warning'}>
                {failureText}
            </Alert>
        )
    }
}

export default ResponseMessage
