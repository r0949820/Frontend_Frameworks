import {FunctionComponent, startTransition, useState} from 'react'
import {useGetProfile} from '../../API/users.ts'
import {useGetDirectories} from '../../API/directories.ts'
import {useGetNotesForDirectory} from '../../API/notes.ts'
import ErrorMessage from '../../utils/errorMessage.tsx'
import {Breadcrumb} from 'react-bootstrap'
import NoUserFound from './noUserFound.tsx'
import Folder from './folder.tsx'
import NewFolder from './newFolder.tsx'
import File from './file.tsx'
import NewFile from './newFile.tsx'

interface UIBreadcrumb {
    name: string
    id: null | number
}

const Folders: FunctionComponent = () => {
    const [currentDirId, setCurrentDirId] = useState<number | null>(null)
    const [breadcrumbs, setBreadcrumbs] = useState<UIBreadcrumb[]>([{name: 'Home', id: null}])
    const {data: profile} = useGetProfile()
    const {data: folders, isError: isDirError} = useGetDirectories(currentDirId)
    const {data: notes, isError: isNoteError} = useGetNotesForDirectory(currentDirId)

    if (isDirError) {
        return (
            <ErrorMessage>
                <p>Couldn't retrieve the directories, please refresh the page and try again.</p>
            </ErrorMessage>
        )
    }

    if (isNoteError) {
        return (
            <ErrorMessage>
                <p>Couldn't retrieve the folders, please refresh the page and try again.</p>
            </ErrorMessage>
        )
    }

    const navigateToParent = () => {
        startTransition(() => {
            const i = breadcrumbs.length - 2
            setCurrentDirId(breadcrumbs[i].id)
            setBreadcrumbs(breadcrumbs => breadcrumbs.slice(0, i + 1))
        })
    }

    const navigateToDir = (id: number | null, name: string) => {
        startTransition(() => {
            setBreadcrumbs(crumbs => [...crumbs, {name, id}])
            setCurrentDirId(id)
        })
    }

    const navigateBreadcrumb = (i: number) => {
        if (i !== breadcrumbs.length - 1) {
            startTransition(() => {
                setCurrentDirId(breadcrumbs[i].id)
                setBreadcrumbs(breadcrumbs => breadcrumbs.slice(0, i + 1))
            })
        }
    }

    const breadcrumb = (i: number, {id, name}: UIBreadcrumb) => (
        <Breadcrumb.Item key={id} onClick={() => navigateBreadcrumb(i)}>{name}</Breadcrumb.Item>
    )

    return (
        <>
            <Breadcrumb>
                {breadcrumbs.map((b, i) => breadcrumb(i, b))}
            </Breadcrumb>

            {!profile?.id && <NoUserFound/>}

            {!!currentDirId && <Folder name=".." clickHandler={() => navigateToParent()} enableLoading={false}/>}
            {folders?.map(f => <Folder key={f.id || 'temp'} name={f.name} enableLoading={true}
                                       clickHandler={() => navigateToDir(f.id, f.name)}/>)}

            <NewFolder currentDirId={currentDirId}/>

            {notes?.map(n => <File {...n} key={n.id || 'temp'}/>)}
            <NewFile currentDirId={currentDirId}/>

        </>
    )
}

export default Folders
