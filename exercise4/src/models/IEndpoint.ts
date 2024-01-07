export type EndpointType = 'topstories.json' | 'askstories.json' | 'showstories.json' | 'jobstories.json'

export interface IEndpoint {
    id: number
    title: string
    endpoint: EndpointType
}
