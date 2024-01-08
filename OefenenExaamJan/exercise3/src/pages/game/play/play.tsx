import {FunctionComponent, useState} from 'react'
import Configuration from './configuration.tsx'
import {Container} from 'react-bootstrap'
import {getMaxNumberOfQuestionsForRegion, getQuestions} from '../../../api/capitalsAPI.ts'
import {useParams} from 'react-router-dom'
import Question from './question.tsx'
import IQuestion from '../../../models/IQuestion.ts'
import Result from './result.tsx'

interface PlayProps {

}

const Play: FunctionComponent<PlayProps> = () => {
    const {chosenRegion} = useParams()
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5)
    const maxNumberOfQuestions = getMaxNumberOfQuestionsForRegion(chosenRegion!)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [questions, setQuestions] = useState<IQuestion[]>(getQuestions(chosenRegion!, numberOfQuestions))


    const startNewGame = (nbQuestion: number) => {
        setNumberOfQuestions(nbQuestion)
        setCurrentQuestion(0)
        setScore(0)
        setQuestions(getQuestions(chosenRegion!, nbQuestion))
    }

    const answerQuestion = (answer: string) => {
        if (answer == questions[currentQuestion].city) {
            setScore(x => x + 1)
        }
        setCurrentQuestion(x => x + 1)
    }


    return (
        <Container>
            {maxNumberOfQuestions > 5 &&
                <Configuration startNewGame={startNewGame}
                               maxNumberOfQuestions={maxNumberOfQuestions}/>}

            {currentQuestion == numberOfQuestions ?
                <Result score={score} numberOfQuestions={numberOfQuestions}/> :
                <Question country={questions[currentQuestion].country}
                          answerQuestion={answerQuestion}
                          answers={questions[currentQuestion].answers}
                          currentQuestion={currentQuestion}
                          numberOfQuestions={numberOfQuestions} score={score}/>}
        </Container>
    )
}

export default Play