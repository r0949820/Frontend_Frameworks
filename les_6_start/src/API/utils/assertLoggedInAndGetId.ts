import getUser from './getUser.ts'

/**
 * Retrieve the id of the currently logged-in user.
 * @throw An error will be thrown when there is no logged-in user.
 */
const assertLoggedInAndGetId = async (): Promise<string> => {
    const id = (await getUser())?.id

    if (!id) {
        throw new Error(`No sessions found!`)
    }

    return id
}

export default assertLoggedInAndGetId
