import {FunctionComponent, Suspense, useContext, useState} from 'react'
import LoadingPage from '../utils/loadingPage.tsx'
import LanguageContext from '../context/languageContext.tsx'
import {useCreateSurvey, useGetAllSurveys} from '../api/surveyApi.ts'
import LoadingPart from '../utils/loadingPart.tsx'
import Survey from './survey.tsx'
import {useGetUser} from '../api/userApi.ts'

const SurveyContent: FunctionComponent = () => {
    const {language} = useContext(LanguageContext)
    const {data: surveys} = useGetAllSurveys()
    const createSurveyMutation = useCreateSurvey()
    const [newSurveyName, setNewSurveyName] = useState('')
    const {data: user} = useGetUser()

    const createNewSurvey = () => {
        // Aangepast voor het examen.
        if (newSurveyName !== '') {
            createSurveyMutation.mutate({name: newSurveyName})
            setNewSurveyName('')
        }
    }

    return (
        <>
            <h1 data-cy="survey-title">{language === 'en' ? 'My Surveys' : 'Mijn vragenlijsten'}</h1>

            {user && (
                // Check toegevoegd voor het examen.
                <div className={'create-survey-form'} data-cy="new-survey-form">
                    <input value={newSurveyName} onChange={e => setNewSurveyName(e.currentTarget.value)}/>
                    <button onClick={createNewSurvey}>
                        {language === 'en' ? 'Create new survey' : 'Nieuwe vragenlijst aanmaken'}
                        {createSurveyMutation.isLoading && <LoadingPart/>}
                    </button>
                </div>
            )}

            {surveys?.map(s => <Survey key={s.id} {...s}/>)}
        </>
    )
}

const Surveys: FunctionComponent = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <SurveyContent/>
        </Suspense>
    )
}

export default Surveys
