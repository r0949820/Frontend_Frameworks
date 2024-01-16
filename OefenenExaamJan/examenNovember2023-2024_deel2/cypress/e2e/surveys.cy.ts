const testSurveyName = 'Test Survey'

Cypress._.times(1, () => {
    describe('Manage surveys', () => {

        beforeEach(() => {
            cy.visit('/')
        })

        describe(`An unauthenticated user`, () => {
            // Fails and requires a fix.
            it(`Can see surveys but cannot see the edit button or the new survey form..`, () => {
                cy.getByData('survey').should('exist')
                cy.getByData('edit-survey').should('not.exist')
                cy.getByData('new-survey-form').should('not.exist')
            })
        })

        describe(`An authenticated user`, () => {

            beforeEach(() => {
                cy.createTestAccount()
                cy.login()
                cy.visit('/')
            })

            afterEach(() => {
                cy.deleteTestAccount()
            })

            it(`Can't create a survey with an empty name.`, () => {
                // Fails and requires a fix.
                cy.getByData('survey').its('length').then(oldLength => {
                    cy.getByData('new-survey-form').find('button').click()
                    cy.getByData('survey').should('have.length', oldLength)
                })
            })

            it(`When English is selected, the title should be "My Surveys", when dutch is selected, it should be something else.`, () => {
                cy.getByData('english').click()
                cy.getByData('survey-title').should('have.text', 'My Surveys')
                cy.getByData('dutch').click()
                cy.getByData('survey-title').should('not.have.text', 'My Surveys')
            })

            it(`Can create a surveys.`, () => {
                cy.getByData('survey').its('length').then(oldLength => {
                    cy.getByData('new-survey-form').find('input').type(testSurveyName)
                    cy.getByData('new-survey-form').find('button').click()
                    cy.getByData('survey').its('length').should('equal', oldLength + 1)
                })
            })
        })
    })

})
