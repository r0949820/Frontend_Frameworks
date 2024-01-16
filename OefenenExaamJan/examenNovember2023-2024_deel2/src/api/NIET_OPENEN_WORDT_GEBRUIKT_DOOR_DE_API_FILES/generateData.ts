import {faker} from '@faker-js/faker'
import {ISurvey} from '../../models/ISurvey.ts'
import {IQuestion, QuestionType} from '../../models/IQuestion.ts'

export const generateAllData = () => {
    const surveys = generateSurveys()
    generateQuestions(surveys)
}

/**
 * Generate 10 random surveys.
 *
 */
const generateSurveys = (): ISurvey[] => {
    const surveys = Array(20).fill(null).map(() => generateSurvey())
    localStorage._surveys = JSON.stringify(surveys)
    return surveys
}

export const generateQuestions = (surveys: ISurvey[]): IQuestion[] => {
    let questions: IQuestion[] = []

    for (const survey of surveys) {
        questions = [
            ...questions,
            ...Array(faker.number.int({min: 2, max: 8})).fill(null).map(() => generateQuestion(survey.id)),
        ]
    }
    localStorage._questions = JSON.stringify(questions)

    return questions
}

/**
 * Generate a random survey.
 *
 */
export const generateSurvey = (): ISurvey => {
    return {
        id: faker.string.uuid(),
        name: faker.lorem.sentence({min: 5, max: 10}),
        createdAt: new Date(faker.date.past({years: 3})).getTime(),
    }
}

/**
 * Generate a question
 *
 * @param surveyId Het id van de survey die de vraag bevat.
 */
export const generateQuestion = (surveyId: string): IQuestion => {
    const type = pickRandomFromArray(['single-line-answer', 'multi-line-answer', 'multiple-select'], 1, 1)[0]
    let options = null

    if (type === 'multiple-select') {
        options = Array(faker.number.int({min: 2, max: 5})).fill(null).map(() => ({
            name: faker.lorem.sentence({min: 3, max: 5}),
            id: faker.string.uuid(),
        }))
    }

    return {
        id: faker.string.uuid(),
        surveyId,
        title: faker.lorem.sentence({min: 3, max: 10}),
        options,
        type: type as QuestionType,
    }
}


/**
 * Choose a specified number of random elements from a given array.
 *
 * @param array {any[]} The array to choose random elements from.
 * @param nbElementsMin {number} The minimum amount of elements to choose from the array.
 * @param nbElementsMax {number} The maximum amount of elements to choose from the array, defaults to nbElementsMin.
 */
const pickRandomFromArray = <T>(array: T[], nbElementsMin: number, nbElementsMax: number): T[] => {
    if (!nbElementsMax) {
        nbElementsMax = nbElementsMin
    }
    const nbElements = faker.number.int({min: nbElementsMin, max: nbElementsMax})
    return faker.helpers.shuffle(array).slice(0, nbElements)
}
