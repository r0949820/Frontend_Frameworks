import {FormEventHandler, FunctionComponent, useEffect, useRef, useState} from 'react'
import FileSystemCard from './styledComponents/fileSystemCard.tsx'
import {Button, Card, Modal, Form} from 'react-bootstrap'
import FileSystemIcon from './styledComponents/fileSystemIcon.tsx'
import FileSystemName from './styledComponents/fileSystemName.tsx'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from '../../utils/errorMessage.tsx'
import {useCreateDirectory} from '../../API/directories.ts'

interface NewFolderProps {
    currentDirId: number | null
}

const NewFolder: FunctionComponent<NewFolderProps> = ({currentDirId}) => {
    const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false)
    const [name, setName] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(true)
    // The mutate property contains the function that can be used to alter the server data.
    const {isError, mutate: createDirectory} = useCreateDirectory()

    // The useRef hook can be used to directly access an HTML element in the DOM.
    // While this should be avoided, it can sometimes be necessary.
    // The default value must be null, otherwise you'll receive TypeScript errors.
    // For more information see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/38228#issuecomment-529749802.
    const formRef = useRef<HTMLInputElement>(null)

    useEffect(
        () => {
            if (showNewFolderModal) {
                // We can only place the focus on the form input if it has been rendered.
                formRef.current?.focus()
            }
        },
        // The effect wil fire every time the showNewFolderModal variable changes from true to false or the reverse.
        [showNewFolderModal],
    )

    const closeHandler = () => {
        setName('')
        setShowNewFolderModal(false)
    }

    const createFolder: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault()
        setShowErrorMessage(true)
        createDirectory({name, parentId: currentDirId})
        closeHandler()
    }

    return (
        <>
            <FileSystemCard onClick={() => setShowNewFolderModal(true)} data-cy="new-folder">
                <Card.Title>
                    <FileSystemIcon icon={faFolderPlus}/>
                    <FileSystemName>New Folder</FileSystemName>
                </Card.Title>
            </FileSystemCard>

            <Modal show={showNewFolderModal} centered onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>New folder</Modal.Title>
                </Modal.Header>
                <form onSubmit={createFolder}>
                    <Modal.Body>
                        <p>Please enter a title for the folder</p>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="The title of the new folder"
                                          value={name}
                                          ref={formRef}
                                          onChange={(evt) => setName(evt.target.value)}/>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeHandler}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={name === ''}>Create folder</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={isError && showErrorMessage} centered onHide={() => setShowErrorMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ErrorMessage>
                        <p>Couldn't create a new directory, please ensure you are logged in and try again.</p>
                    </ErrorMessage>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowErrorMessage(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewFolder
