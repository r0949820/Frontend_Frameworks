import {FunctionComponent, Suspense} from 'react'
import {Row} from 'react-bootstrap'
import LoadingPage from '../../utils/loadingPage.tsx'
import Folders from './folders.tsx'

const FileSystem: FunctionComponent = () => {
    return (
        <Row>
            <Suspense fallback={<LoadingPage/>}>
                <Folders/>
            </Suspense>
        </Row>
    )
}

export default FileSystem
