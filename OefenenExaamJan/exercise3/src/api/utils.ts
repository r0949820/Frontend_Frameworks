/**
 * Return a random integer between min (inclusive) and max (inclusive).
 *
 * @param min The lower bound (inclusive).
 * @param max The upper bound (inclusive).
 * @return The randomly generated number.
 */
export const randomIntFromInterval = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Perform a Fisher Yates shuffle on the given array.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
export const shuffle = <T>(array: T[]): T[] => {
    let currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}
