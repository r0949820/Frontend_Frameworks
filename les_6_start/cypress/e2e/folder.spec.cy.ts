const folderName = 'A new folder'

describe('Create a Folder', () => {

    // Tests should run in isolation, therefor Cypress clears the localstorage en cookies after each test.
    // This means that the following code is not a good idea and won't entirely work.
    // The account will continue to exist throughout the test suite, but after the first test it won't be logged in
    // anymore.
    // before(() => {
    //     cy.createTestAccount()
    //     cy.login()
    // })

    beforeEach(() => {
        cy.createTestAccount()
        cy.login()
        cy.visit('/filesystem')
        cy.getByData('new-folder').as('newFolder')
        cy.getByData('folder').as('folders')
    })

    // Tests should run in isolation, therefor Cypress clears the localstorage en cookies after each test.
    // This means that the following code is not a good idea, the account wil continue to exists throughout the entire
    // suite.
    // after(() => {
    //     cy.deleteTestAccount()
    // })

    afterEach(() => {
        cy.deleteTestAccount()
    })

    it('Clicks the new folder button and created a new folder', () => {
        // Cypress yields the result from a command rather than returning it.
        // This means that the result of a command cannot be stored in a variable.
        // If you want to do something more with the result than pass it to the next command,
        // the then function must be used. This is not the same as Promise.then().
        cy.get('@folders').its('length').then(oldLength => {
            cy.get('@newFolder').click()
            cy.get('input').type(`${folderName}{enter}`)
            cy.get('@folders')
                .should('have.length', oldLength + 1)
                .should('contain.text', folderName)
        })
    })

    it(`Opens a default folder, creates a subfolder,  navigates to it and back to the top`, () => {
        cy.get('@folders').contains('React').click()
        cy.get('@newFolder').click()
        cy.get('input').type(`${folderName}{enter}`)
        cy.get('@folders').should('contain.text', folderName)
        cy.get('@folders').contains('..').click()
        cy.get('@folders').should('not.contain.text', folderName)
    })
})
