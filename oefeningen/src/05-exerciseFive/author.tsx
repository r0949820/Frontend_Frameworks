import {FunctionComponent} from 'react'

interface AuthorProps {
    firstName: string
    lastName: string
}

const Author: FunctionComponent<AuthorProps> = ({firstName, lastName}) => {
    return (
        <div className="author">
            {firstName} {lastName}
        </div>
    )
}

export default Author