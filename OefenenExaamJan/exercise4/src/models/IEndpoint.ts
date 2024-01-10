export type EndpointType = 'topstories' | 'askstories' | 'showstories' | 'jobstories'

export interface IEndpoint {
    id: number
    title: string
    endpoint: EndpointType
}
