import {IDirectory} from './IDirectory.ts'

export interface INote {
    id: string
    title: string
    content: string
    folderId: number | null
    userId: string
    updatedAt: number
}

export interface INoteWithDirectoryInfo extends INote {
    directory: IDirectory | null
}
