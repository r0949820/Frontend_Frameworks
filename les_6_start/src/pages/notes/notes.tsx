import {FunctionComponent, Suspense} from 'react'
import LoadingPage from '../../utils/loadingPage.tsx'
import NoteList from './noteList.tsx'

const Notes: FunctionComponent = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <NoteList/>
        </Suspense>
    )
}

export default Notes
