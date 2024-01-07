import {FunctionComponent} from 'react'
import {useNavigate} from 'react-router-dom'
import FileSystemCard from './styledComponents/fileSystemCard.tsx'
import {Card} from 'react-bootstrap'
import FileSystemIcon from './styledComponents/fileSystemIcon.tsx'
import FileSystemName from './styledComponents/fileSystemName.tsx'
import LoadingPart from '../../utils/loadingPart.tsx'
import {faFileLines} from '@fortawesome/free-solid-svg-icons'


interface FileProps {
    title: string
    id: string
}

const File: FunctionComponent<FileProps> = ({title, id}) => {
    const navigate = useNavigate()

    return (
        <FileSystemCard onClick={() => navigate(`/notes/${id}`)}>
            <Card.Title>
                <FileSystemIcon icon={faFileLines}/>
                <FileSystemName>{title}</FileSystemName>
            </Card.Title>
            {!id && <LoadingPart/>}
        </FileSystemCard>
    )
}

export default File
