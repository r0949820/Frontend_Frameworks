import {FunctionComponent} from 'react'
import {useParams} from 'react-router-dom'
import {useDeleteQuestion} from '../../api/questionApi.ts'
import {IQuestion} from '../../models/IQuestion.ts'

const MultipleSelectQuestion: FunctionComponent<IQuestion> = ({title, id, options}) => {
    const {id: surveyId} = useParams()
    const deleteQuestionMutation = useDeleteQuestion(surveyId!)

    return (
        <div className={'question'}>
            <div>
                <h3>{title}</h3>
                <fieldset disabled={true}>
                    <legend>Choose all that apply</legend>
                    {options?.map(o => (
                        <div key={o.id}>
                            <input type="checkbox" id={o.id}/>
                            <label>{o.name}</label>
                        </div>
                    ))}
                </fieldset>
            </div>
            <div>
                <button onClick={() => deleteQuestionMutation.mutate({questionId: id})}>
                    X
                </button>
            </div>
        </div>
    )
}

export default MultipleSelectQuestion
