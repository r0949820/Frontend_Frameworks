import { defineConfig } from 'cypress'
import {getCurrentSession} from './cypress/support/tasks'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', vitePreprocessor())
      on('task', {
        getCurrentSession,
      })
    },
    baseUrl: 'http://localhost:5173',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  env: {
    supabaseFunctionsUrl: 'https://vaolhgulafwfxgrqpngy.functions.supabase.co/',
    testAccount: 'cypressAccountLaurensThys@testing.com',
    testPassword: 'test123test',
    testUsername: 'Test Account',
    sessionName: 'sb-vaolhgulafwfxgrqpngy-auth-token',
  },
})
