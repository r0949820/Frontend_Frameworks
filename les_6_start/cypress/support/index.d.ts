import {ReactElement} from 'react'

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mount a React component.
             * @example
             * cy.mount(<></>)
             */
            mount(elem: ReactElement): Chainable

            /**
            * Retrieve an HTMLElement using the data-cy attribute.
            * @example
            * cy.getByData('example-attribute')
            */
            getByData(selector: string): Chainable

            /**
             * Login with the default account specified in cypress.config.ts.
             * @example
             * cy.login()
             */
            login(): void

            /**
             * Delete the test account from the database.
             * @example
             * cy.deleteTestAccount()
             */
            deleteTestAccount(): void

            /**
             * Create a test account with or without the database.
             * @example
             * cy.createTestAccount()
             */
            createTestAccount(): void
        }
    }
}