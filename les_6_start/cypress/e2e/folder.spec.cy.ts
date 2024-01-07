const folderName = 'A new folder'

describe('Create a Folder', () => {

    beforeEach(() => {
        cy.createTestAccount()
        cy.login()
        cy.visit('/filesystem')
        cy.getByData('new-folder').as('newFolder')
        cy.getByData('folder').as('folders')

    })

    afterEach(() => {
        cy.deleteTestAccount()
    })

    it('Clicks the new folder button and created a new folder', () => {
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
