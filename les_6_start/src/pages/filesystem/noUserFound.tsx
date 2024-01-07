import {FunctionComponent} from 'react'
import {Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'


const NoUserFound: FunctionComponent = () => {
    return (
        <Alert variant="info">
            <p>
                You are not logged in, you can use the site in demo mode, please <Link to={'/login'}>log in</Link> to
                use the full functionality.
            </p>
        </Alert>
    )
}

export default NoUserFound
