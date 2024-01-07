import {FunctionComponent} from 'react'
import {IDirectory} from '../../models/IDirectory.ts'
import {useDeleteNote} from '../../API/notes.ts'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons'

const StyledIcon: typeof FontAwesomeIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`

interface NoteProps {
    id: string
    title: string
    directory: IDirectory | null
}

const Note: FunctionComponent<NoteProps> = ({id, title, directory}) => {
    const {mutate} = useDeleteNote()
    const navigate = useNavigate()

    return (
        <tr>
            <td>{title}</td>
            <td>{directory?.name || '/'}</td>
            <td>
                <StyledIcon icon={faPenToSquare} onClick={() => navigate(id)}/>
            </td>
            <td onClick={() => mutate({id})}>
                <StyledIcon icon={faTrashCan}/>
            </td>
        </tr>
    )
}

export default Note
