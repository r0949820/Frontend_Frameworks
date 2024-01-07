enum HackerNewsType {
    job = 'job',
    story = 'story',
    comment = 'comment',
    poll = 'poll',
    pollopt = 'pollopt'
}


export interface IItem {
    id: number
    deleted?: boolean
    type: HackerNewsType
    by?: string
    time?: number
    dead?: boolean
    kids?: number[]
    descendants?: number[]
    score?: number
    title?: string
    url?: string
    text?: string
}
