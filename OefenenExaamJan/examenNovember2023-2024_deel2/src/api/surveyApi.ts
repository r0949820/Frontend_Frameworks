import {
    persistToDatabase,
    retrieveFromDatabase,
} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.ts'
import {faker} from '@faker-js/faker'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import {generateQuestion} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/generateData.ts'
import {ISurvey} from '../models/ISurvey.ts'
import {IQuestion} from '../models/IQuestion.ts'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetAllSurveys = (): UseQueryResult<ISurvey[], Error> => {
    return useQuery(
        ['surveys'],
        getAllSurveys,
    )
}


export const useCreateSurvey = (): UseMutationResult<ISurvey, Error, CreateSurveyParams, void> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createSurvey,
        onSuccess: (data) => {
            queryClient.setQueryData<ISurvey[]>(['surveys'], x => [data, ...x ?? []])
        },
        onSettled: async () => {
            await queryClient.invalidateQueries(['surveys'])
        },
    })
}

//endregion


//region Fetching functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          Fetching functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Haal alle surveys op die in de database zitten.
 */
const getAllSurveys = async (): Promise<ISurvey[]> => {
    const surveys = await retrieveFromDatabase<ISurvey[]>('_surveys', false)
    return surveys.sort((a, b) => b.createdAt - a.createdAt)
}

interface CreateSurveyParams {
    name: string
}

/**
 * Maak een nieuwe survey aan.
 *
 * @param name De naam van de survey.
 */
const createSurvey = async ({name}: CreateSurveyParams): Promise<ISurvey> => {
    const survey = {
        name,
        id: faker.string.uuid(),
        createdAt: Date.now(),
    }
    const questions = Array(faker.number.int({min: 2, max: 8})).fill(null).map(() => generateQuestion(survey.id))

    const surveys = await retrieveFromDatabase<ISurvey[]>('_surveys', false)
    await persistToDatabase('_surveys', [...surveys, survey], false)

    const oldQuestions = await retrieveFromDatabase<IQuestion[]>('_questions', false)
    await persistToDatabase('_questions', [...oldQuestions, ...questions], false)

    return survey
}

//endregion
