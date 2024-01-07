import {FunctionComponent, useEffect, useRef, useState} from 'react'
import {Form, Card, Modal, Button, FormControl} from 'react-bootstrap'
import FileSystemCard from './styledComponents/fileSystemCard.tsx'
import FileSystemIcon from './styledComponents/fileSystemIcon.tsx'
import FileSystemName from './styledComponents/fileSystemName.tsx'
import {faFileCirclePlus} from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from '../../utils/errorMessage.tsx'
import {useCreateNote} from '../../API/notes.ts'

interface NewFileProps {
    currentDirId: number | null
}

const NewFile: FunctionComponent<NewFileProps> = ({currentDirId}) => {
    const [showNewNoteModal, setShowNewNoteModal] = useState<boolean>(false)
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(true)
    const [title, setTitle] = useState('')
    // The mutate property contains the function that can be used to alter the server data.
    const {mutate: createNote, isError} = useCreateNote()

    // The useRef hook can be used to directly access an HTML element in the DOM.
    // While this should be avoided, it can sometimes be necessary.
    // The default value must be null, otherwise you'll receive TypeScript errors.
    // For more information see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/38228#issuecomment-529749802.
    const formRef = useRef<HTMLInputElement>(null)

    useEffect(
        () => {
            if (showNewNoteModal) {
                // We can only place the focus on the form input if it has been rendered.
                formRef.current?.focus()
            }
        },
        // The effect wil fire every time the showNewNoteModal variable changes from true to false or the reverse.
        [showNewNoteModal],
    )


    const closeHandler = () => {
        setTitle('')
        setShowNewNoteModal(false)
    }

    const createFile = () => {
        createNote({title, folderId: currentDirId})
        setShowNewNoteModal(false)
        setShowErrorMessage(true)
        setTitle('')
    }

    return (
        <>
            <FileSystemCard onClick={() => setShowNewNoteModal(true)}>
                <Card.Title>
                    <FileSystemIcon icon={faFileCirclePlus}/>
                    <FileSystemName>New File</FileSystemName>
                </Card.Title>
            </FileSystemCard>

            <Modal show={showNewNoteModal} centered onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>New note</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please enter a title for the new markdown note.</p>
                    <Form.Group className="mb-3">
                        <FormControl type="text" placeholder="The title of the new note" as="input"
                                     value={title}
                                     ref={formRef}
                                     onChange={(evt) => setTitle(evt.target.value)}/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>Cancel</Button>
                    <Button variant="primary" onClick={createFile} disabled={title === ''}>Create Note</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isError && showErrorMessage} centered onHide={() => setShowErrorMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ErrorMessage>
                        <p>Couldn't create a file, please ensure you are logged in and try again.</p>
                    </ErrorMessage>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowErrorMessage(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewFile
