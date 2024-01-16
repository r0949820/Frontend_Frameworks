import {IProfile} from './IProfile.ts'

interface ITask {
    id: number
    name: string
    complete: boolean
    toDoListId: number
    createdBy: string | IProfile
    completedBy?: string | IProfile | null
    deadline: Date
}

export default ITask
