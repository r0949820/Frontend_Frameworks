import {ChangeEventHandler, FunctionComponent} from 'react'
import styled from 'styled-components'
import {Col, Container, Row} from 'react-bootstrap'
import {Navigate, useParams} from 'react-router-dom'
import MarkdownPreview from '@uiw/react-markdown-preview'
import {useGetNote, useUpdateNote} from '../../../API/notes.ts'

const StyledContainer: typeof Container = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  min-width: 100vw;
`

const StyledTextarea = styled.textarea`
  border: none;
  width: 100%;
  resize: none;
`

const Editor: FunctionComponent = () => {
    const {id} = useParams()
    // It is safe to use the cast here since it is impossible for this page to be rendered when there is no parameter
    // (assuming the routing was configured correctly).
    const {data: note} = useGetNote(id as string)
    const {mutate: updateNote} = useUpdateNote()

    if (!note) {
        return <Navigate to={'/'}/>
    }

    const updateContent: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
        // It is necessary to copy the contents of the note.
        // All data in a TanStack query cache is read-only.
        // Furthermore, if we didn't copy the contents, it wouldn't trigger a re-render
        // because the new object would be considered the same as the old one (same memory address).
        // This is the same problem that we encountered in the seventh exercise of lecture 2.
        const newNote = {...note, content: evt.target.value, updatedAt: Date.now()}
        updateNote({newNote})
    }

    return (
        <StyledContainer className="d-flex flex-column vh-100">
            <Row className="h-100 flex-grow-1" style={{marginTop: '5em'}}>
                <Col xs={12} md={6} className="border-end border-1">
                    <StyledTextarea className="h-100" value={note?.content} onChange={updateContent}/>
                </Col>
                <Col className="flex-grow-1" xs={12} md={6}>
                    <MarkdownPreview source={note?.content} wrapperElement={{'data-color-mode': 'light'}}/>
                </Col>
            </Row>
        </StyledContainer>
    )
}

export default Editor
