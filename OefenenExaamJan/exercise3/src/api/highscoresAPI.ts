import {getAllRegions, getMaxNumberOfQuestionsForRegion} from './capitalsAPI.js'
import {randomIntFromInterval} from './utils.js'
import {faker} from '@faker-js/faker'
import {v4 as uuid} from 'uuid'
import IHighscore from '../models/IHighscore.ts'

/**
 * Retrieve the name that was last used to register a highscore.
 */
export const getLastHighscoreName = (): string => {
    return localStorage.highscorer ?? ''
}

/**
 * Retrieve the highscores for a given region.

 *
 * @param region The region for which to retrieve the highscores.
 */
export const getHighscoresForLocation = (region: string): IHighscore[] => {
    const scores = getScores()
    return scores[region]
}

/**
 * Add a new highscore to the database.
 *
 * @param nbQuestions The number of questions that were asked during the test.
 * @param score The number of questions that were answered correctly.
 * @param region The region that contains the countries about which the test contained questions.
 * @param name The name of the person who achieved the given score.
 */
export const addScore = (nbQuestions: number, score: number, region: string, name: string): void => {
    const scores = getScores()
    scores[region].push({nbQuestions, score, name, id: uuid()})
    scores[region].sort((a, b) => b.score / b.nbQuestions - a.score / a.nbQuestions)
    localStorage.scores = JSON.stringify(scores)
    localStorage.highscorer = name
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------------------------------------
 *                 DO NOT USE THE FOLLOWING IN YOUR SOLUTION, ONLY THE CODE ABOVE SHOULD BE USED
 * ---------------------------------------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Generate new highscores to test with.
 *
 * @return {{}}
 */
const generateHighScores = (): Record<string, IHighscore[]> => {
    const locations = getAllRegions()
    const highscores: Record<string, IHighscore[]> = {}
    for (const location of locations) {
        const scoresForLocation = []
        const nbScores = randomIntFromInterval(1, 10)
        const maxQuestions = getMaxNumberOfQuestionsForRegion(location)

        for (let i = 0; i < nbScores; i++) {
            const nbQuestions = randomIntFromInterval(5, maxQuestions)
            const score = randomIntFromInterval(0, nbQuestions)
            scoresForLocation.push({
                name: faker.person.fullName(),
                nbQuestions,
                score: score,
                id: uuid(),
            })
        }
        scoresForLocation.sort((a, b) => b.score / b.nbQuestions - a.score / a.nbQuestions)
        highscores[location] = scoresForLocation
    }
    return highscores
}

/**
 * Load the highscores from local storage.
 *
 * @return {{}}
 */
const getScores = (): Record<string, IHighscore[]> => {
    let scores: Record<string, IHighscore[]>
    if (localStorage.scores) {
        scores = JSON.parse(localStorage.scores) as Record<string, IHighscore[]>
    } else {
        scores = generateHighScores()
        localStorage.scores = JSON.stringify(scores)
    }
    return scores
}
