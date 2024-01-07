// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.Commands.add('createTestAccount', () => {
    cy.request(
        {
            method: 'POST',
            url: `${Cypress.env('supabaseFunctionsUrl')}create-account`,
            form: true,
            auth: {
                'bearer': import.meta.env.VITE_SUPABASE_KEY,
            },
            body: {
                email: Cypress.env('testAccount').toLowerCase(),
                password: Cypress.env('testPassword'),
                username: Cypress.env('testUsername'),
            },
        },
    )
})

Cypress.Commands.add('deleteTestAccount', () => {
    cy.request(
        {
            method: 'POST',
            url: `${Cypress.env('supabaseFunctionsUrl')}delete-account`,
            form: true,
            auth: {
                'bearer': import.meta.env.VITE_SUPABASE_KEY,
            },
            body: {
                email: Cypress.env('testAccount').toLowerCase(),
            },
        },
    )
})

Cypress.Commands.add('login', () => {
    cy
        .task(
            'getCurrentSession',
            {
                email: Cypress.env('testAccount'),
                password: Cypress.env('testPassword'),
                supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
                supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
            },
        )
        .then((session) => {
            window.localStorage[Cypress.env('sessionName')] = JSON.stringify(session)
        })
})

// Alternatively you can use CommonJS syntax:
// require('./commands')