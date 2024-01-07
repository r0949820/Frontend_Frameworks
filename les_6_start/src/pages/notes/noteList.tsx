import {FunctionComponent} from 'react'
import {useGetNotesForUser} from '../../API/notes.ts'
import {Table} from 'react-bootstrap'
import Note from './note.tsx'


const NoteList: FunctionComponent = () => {
    const {data: notes, isError} = useGetNotesForUser()

    return (
        <Table striped bordered hover className={'mt-2'}>
            <thead>
            <tr>
                <th>Title</th>
                <th>Directory</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>

            <tbody>
            {notes?.map(n => <Note key={n.id} {...n}/>)}
            </tbody>
        </Table>
    )
}

export default NoteList
