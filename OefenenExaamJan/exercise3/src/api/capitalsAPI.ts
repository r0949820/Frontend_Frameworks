import Countries, {CountryItem} from 'countries-capitals'
import {randomIntFromInterval, shuffle} from './utils.js'
import IQuestion from '../models/IQuestion.ts'

/**
 * Retrieve an array of questions for the specified region.
 *
 * @param region The region for which the questions must be retrieved.
 * @param numberOfQuestions The amount of questions to be retrieved.
 * @return An array of questions.
 */
export const getQuestions = (region: string | undefined, numberOfQuestions: number): IQuestion[] => {
    if (!region) {
        throw new Error('The region passed to getQuestions is undefined or null')
    }

    if (numberOfQuestions > getMaxNumberOfQuestionsForRegion(region)) {
        throw new Error(`You've asked for more questions than are available`)
    }

    const countriesInRegion = shuffle<IQuestion>(new Countries().byLocation(region)['countries']
        .filter((c: CountryItem) => c.city))
    const questions: IQuestion[] = []

    for (let i = 0; i < numberOfQuestions; i++) {
        const {country, city} = countriesInRegion[i]
        const [alternative1, alternative2] = getAlternatives(countriesInRegion, i)
        questions.push({
            country,
            city,
            answers: shuffle<string>([city, alternative1, alternative2]),
        })
    }
    return questions
}

/**
 * Retrieve the maximum number of questions in a given region. This amount is a direct consequence of the number
 * of countries in the region for which the capital is known.
 *
 * @param region The region for which to retrieve the maximum number of questions.
 * @return The number of countries in the given region.
 */
export const getMaxNumberOfQuestionsForRegion = (region: string): number => {
    return new Countries().byLocation(region)['countries'].filter((c: CountryItem) => c.city).length
}

/**
 * Retrieve a set containing all the supported regions.
 *
 * @return An array of all the available regions.
 */
export const getAllRegions = (): string[] => {
    return Array.from(getAllRegionsSet())
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------------------------------------
 *                 DO NOT USE THE FOLLOWING IN YOUR SOLUTION, ONLY THE CODE ABOVE SHOULD BE USED
 * ---------------------------------------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all the regions for which there are minSize countries.
 * @param minSize The minimum number of countries in a given region.
 * @return {Set<string>} A set of all the countries that match the given minSize.
 */
const getAllRegionsSet = (minSize = 5): Set<string> => {
    const countries = new Countries()

    return new Set(countries
        .list()
        .map(c => c.location)
        .filter(l => l)
        .filter(l => new Countries().byLocation(l)['countries'].filter((c: CountryItem) => c.city).length >= minSize)
    ) as Set<string>
}

/**
 * Select two random capitals from the given array. Where the capital isn't that of the
 * country at position i
 *
 * @param countries An array of countries.
 * @param i The forbidden position, the selected capitals can't have this index.
 * @return {string[]}
 */
const getAlternatives = (countries: IQuestion[], i: number) => {
    const alternatives: string[] = []

    while (alternatives.length !== 2) {
        const j = randomIntFromInterval(0, countries.length - 1)
        const city = countries[j].city
        if (j === i || !city || alternatives.includes(city)) continue
        alternatives.push(city)
    }
    return alternatives
}

