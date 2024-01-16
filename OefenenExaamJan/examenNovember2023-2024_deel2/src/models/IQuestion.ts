export type QuestionType = 'single-line-answer' | 'multi-line-answer' | 'multiple-select'


export interface IQuestion {
    id: string
    surveyId: string
    title: string
    type: QuestionType
    options: {name: string, id: string}[] | null
}
