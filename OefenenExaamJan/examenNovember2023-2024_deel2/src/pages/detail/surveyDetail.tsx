import {FunctionComponent, Suspense} from 'react'
import LoadingPage from '../../utils/loadingPage.tsx'
import {useParams} from 'react-router-dom'
import {useGetAllSurveys} from '../../api/surveyApi.ts'
import {useGetAllQuestionsForSurvey} from '../../api/questionApi.ts'
import SingleLineQuestion from './singleLineQuestion.tsx'
import MultiLineQuestion from './multiLineQuestion.tsx'
import MultipleSelectQuestion from './multipleSelectQuestion.tsx'
import {IQuestion} from '../../models/IQuestion.ts'

const SurveyDetailContents = () => {
    const {id} = useParams()
    const {data: surveys} = useGetAllSurveys()
    const name = surveys?.find(s => s.id === id)?.name
    const {data: questions} = useGetAllQuestionsForSurvey({id: id!})

    const getQuestionComponent = (question: IQuestion) => {
        if (question.type === 'single-line-answer') {
            return <SingleLineQuestion key={question.id} {...question}/>
        } else if (question.type === 'multi-line-answer') {
            return <MultiLineQuestion key={question.id} {...question}/>
        } else {
            return <MultipleSelectQuestion key={question.id} {...question}/>
        }
    }

    return (
        <div>
            <h1>{name}</h1>

            {questions?.map(q => getQuestionComponent(q))}
        </div>
    )
}


const SurveyDetail: FunctionComponent = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <SurveyDetailContents/>
        </Suspense>
    )
}

export default SurveyDetail
