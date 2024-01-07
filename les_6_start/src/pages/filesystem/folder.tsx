import {FunctionComponent, useState} from 'react'
import FileSystemCard from './styledComponents/fileSystemCard.tsx'
import FileSystemIcon from './styledComponents/fileSystemIcon.tsx'
import FileSystemName from './styledComponents/fileSystemName.tsx'
import LoadingPart from '../../utils/loadingPart.tsx'
import {Card} from 'react-bootstrap'
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons'

interface FolderProps {
    name: string
    clickHandler: () => void
    enableLoading?: boolean
}

const Folder: FunctionComponent<FolderProps> = ({name, clickHandler, enableLoading}) => {
    const [clicked, setClicked] = useState<boolean>(false)

    const _clickHandler = () => {
        if (enableLoading) {
            setClicked(true)
        }
        clickHandler()
    }

    return (
        <FileSystemCard onClick={_clickHandler} data-cy="folder">
            <Card.Title>
                <FileSystemIcon icon={faFolderOpen}/>
                <FileSystemName>{name}</FileSystemName>
            </Card.Title>
            {clicked && <LoadingPart/>}
        </FileSystemCard>
    )
}

export default Folder
