describe('Authentication', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.getByData('login-btn').as('login')
        cy.getByData('submit-btn').as('submit')
        cy.getByData('email').as('email')
        cy.getByData('password').as('password')

        // Monitor network requests.
        cy.intercept('/auth/**').as('authRequest')
    })

    it(`Can't submit an empty form`, () => {
        // Select the login form.
        cy.getByData('login-btn').click()

        // Submit the form.
        cy.get('@submit').click()

        // Wait to ensure that the website had enough time to execute the submit handler.
        cy.wait(500)

        // Ensure that no HTTP requests were fired.
        cy.get('@authRequest.all').should('have.length', 0)

        // Ensure that the user doesn't see any feedback.
        cy.getByData('success-message').should('not.exist')
        cy.getByData('error-message').should('not.exist')
    })

    it(`Can't login without the proper credentials`, () => {
        cy.getByData('login-btn').click()

        cy.getByData('email').type(Cypress.env('testAccount'))
        cy.getByData('password').type(Cypress._.random(100000, 9999999).toString())
        cy.getByData('submit-btn').click()

        cy.wait('@authRequest')

        cy.getByData('error-message').should('exist')
        cy.getByData('success-message').should('not.exist')
    })

    it('Creates an account and is redirected to the notes page', () => {
        cy.deleteTestAccount()
        cy.getByData('signup-btn').click()
        cy.get('@email').type(Cypress.env('testAccount'))
        cy.getByData('username').type(Cypress.env('testUsername'))
        cy.getByData('password-confirmation').type(Cypress.env('testPassword'))
        cy.get('@password').type(`${Cypress.env('testPassword')}{enter}`)

        cy.url().should('contain', '/notes')
        cy.deleteTestAccount()
    })
})
