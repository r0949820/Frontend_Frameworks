import {FunctionComponent, Suspense} from 'react'
import Editor from './editor.tsx'
import LoadingPage from '../../../utils/loadingPage.tsx'

const NoteDetail: FunctionComponent = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Editor/>
        </Suspense>
    )
}

export default NoteDetail
