import {FunctionComponent} from 'react'
import {useGetProfile} from './API/users.ts'
import ErrorMessage from './utils/errorMessage.jsx'
import Routing from './navigation/routing.tsx'

const App: FunctionComponent = () => {
    const {isError} = useGetProfile()

    if (isError) {
        return (
            <ErrorMessage>
                <p>Something went terribly wrong, please reload the website and try again.</p>
            </ErrorMessage>
        )
    }

    return (
        <>
            <Routing/>
        </>
    )
}

export default App
